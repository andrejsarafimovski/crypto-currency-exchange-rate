import HTTP from 'http-status-codes';
import request from 'node-fetch';
import { codedError } from '../lib';
import { ExchangeRates } from '../types';

export class CoinGecko {
    private static readonly endpoint = 'https://api.coingecko.com/api/v3';

    private static exchangeRates: ExchangeRates = {};

    public static async updateExchangeRates():Promise<void> {
      try {
        // eslint-disable-next-line
        const queryParams = new URLSearchParams();
        queryParams.append('vs_currency', 'usd');
        queryParams.append('per_page', '15');

        const response = await request(
          `${this.endpoint}/coins/markets?${queryParams.toString()}`,
          { method: 'GET' },
        ).then((res) => res.json()) as CoinGeckoResponses.CoinsMarkets;

        this.exchangeRates = response.reduce((acc, coin) => ({
          ...acc,
          [coin.symbol]: { name: coin.name, rate: coin.current_price },
        }), {});
        return;
      } catch (err) {
        const errorMessage = "Couldn't Update Crypto Currency Rates";
        throw codedError(HTTP.INTERNAL_SERVER_ERROR, errorMessage);
      }
    }

    public getExchangeRate(cryptoCurrencyCode: string):number {
      const currency = CoinGecko.exchangeRates[cryptoCurrencyCode];
      if (!currency) {
        throw codedError(HTTP.BAD_REQUEST, `Unsupported crypto currency code: ${cryptoCurrencyCode}`);
      }
      return currency.rate;
    }

}

// eslint-disable-next-line
namespace CoinGeckoResponses {
    export type CoinsMarkets = CoinsMarketsCoinMetadata[];
    interface CoinsMarketsCoinMetadata {
        id: string;
        symbol: string;
        name: string;
        image: string;
        current_price: number;
        market_cap_rank: number;
        high_24h: number;
        low_24h: number;
        price_change_24h: number;
        price_change_percentage_24h: number;
        market_cap_change_24h: number;
        market_cap_change_percentage_24h: number;
        circulating_supply: number;
        total_supply?: number;
        ath: number;
        ath_change_percentage: number;
        ath_date: Date;
        atl: number;
        atl_change_percentage: number;
        atl_date: Date;
        roi: {
            times: number;
            currency: string;
            percentage: number;
        };
        last_updated: Date;
    }
}
