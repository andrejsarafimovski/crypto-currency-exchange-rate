import HTTP from "http-status-codes";
import request from "node-fetch";
import { config } from "../config";
import { codedError } from "../lib";
import { ExchangeRates } from "../types";


const CURRENCY_CODE_LENGTH = 3;

export class CurrencyLayer {
    private static readonly endpoint = "http://api.currencylayer.com";
    private static readonly accessKey = "045fc18f705583140eb4cfd871a25b5d"; // config.integrations.currencyLayer.accessKey;

    private static readonly exchangeRates: ExchangeRates = {
        AFN: { name: "Afghan afghani", rate: 0 },
        AMD: { name: "Armenian Dram", rate: 0 },
        BGN: { name: "Bulgarian Lev", rate: 0 },
        EUR: { name: "Euro", rate: 0 },
        USD: { name: "US Dollar", rate: 0 },
    };

    public static async updateExchangeRates() {
        console.log("Updating Flat Currency Rates");
        try {
            const queryParams = new URLSearchParams();
            queryParams.append("access_key", this.accessKey);
            queryParams.append("currencies", Object.keys(this.exchangeRates).join(","));

            const response = await request(
                `${this.endpoint}/live?${queryParams.toString()}`,
                { method: "GET" }
            ).then(res => res.json()) as CurrencyLayerResponses.Live;

            Object.keys(response.quotes).forEach(key => {
                const currencyCode = key.substring(CURRENCY_CODE_LENGTH);
                if (this.exchangeRates[currencyCode]) {
                    this.exchangeRates[currencyCode].rate = response.quotes[key];
                }
            });
            console.log("Updated Flat Currency Rates");
        } catch (err) {
            const errorMessage = "Couldn't Update Flat Currency Rates";
            console.error(errorMessage);
            throw codedError(HTTP.INTERNAL_SERVER_ERROR, errorMessage);
        }
    }

    public getExchangeRate(flatCurrencyCode: string) {
        const currency = CurrencyLayer.exchangeRates[flatCurrencyCode];
        if (!currency) {
            throw codedError(HTTP.BAD_REQUEST, `Unsupported flat currency code: ${flatCurrencyCode}`);
        }
        return currency.rate;
    }
}

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
