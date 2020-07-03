import HTTP from 'http-status-codes';
import request from 'node-fetch';
import { config } from '../config';
import { codedError } from '../lib';
import { ExchangeRates } from '../types';


const CURRENCY_CODE_LENGTH = 3;

export class CurrencyLayer {
    private static readonly endpoint = 'http://api.currencylayer.com';

    private static readonly accessKey = config.integrations.currencyLayer.accessKey;

    private static readonly exchangeRates: ExchangeRates = {
      AFN: { name: 'Afghan afghani', rate: 0 },
      AMD: { name: 'Armenian Dram', rate: 0 },
      BGN: { name: 'Bulgarian Lev', rate: 0 },
      EUR: { name: 'Euro', rate: 0 },
      USD: { name: 'US Dollar', rate: 0 },
    };

    public static async updateExchangeRates():Promise<void> {
      try {
        // eslint-disable-next-line
        const queryParams = new URLSearchParams();
        queryParams.append('access_key', this.accessKey);
        queryParams.append('currencies', Object.keys(this.exchangeRates).join(','));

        const response = await request(
          `${this.endpoint}/live?${queryParams.toString()}`,
          { method: 'GET' },
        ).then((res) => res.json()) as CurrencyLayerResponses.Live;

        Object.keys(response.quotes).forEach((key) => {
          const currencyCode = key.substring(CURRENCY_CODE_LENGTH);
          if (this.exchangeRates[currencyCode]) {
            this.exchangeRates[currencyCode].rate = response.quotes[key];
          }
        });
        return;
      } catch (err) {
        const errorMessage = "Couldn't Update Flat Currency Rates";
        throw codedError(HTTP.INTERNAL_SERVER_ERROR, errorMessage);
      }
    }

    public getExchangeRate(flatCurrencyCode: string):number {
      const currency = CurrencyLayer.exchangeRates[flatCurrencyCode];
      if (!currency) {
        throw codedError(HTTP.BAD_REQUEST, `Unsupported flat currency code: ${flatCurrencyCode}`);
      }
      return currency.rate;
    }
}

// eslint-disable-next-line
namespace CurrencyLayerResponses {
    export interface Live {
        success: boolean;
        terms: string;
        privacy: string;
        timestamp: number;
        source: string;
        quotes: { [key: string]: number; };
    }
}
