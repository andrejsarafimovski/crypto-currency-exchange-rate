import HTTP from "http-status-codes";
import request from "node-fetch";

interface ExchangeRates {
    [key: string]: {
        name: string;
        rate: number;
    };
}

export class CoinGecko {
    private static readonly endpoint = "https://api.coingecko.com/api/v3";

    private static exchangeRates: ExchangeRates = {};

    public static async updateExchangeRates() {
        console.log("Updating Crypto Currency Rates");
        const queryParams = new URLSearchParams();
        queryParams.append("vs_currency", "usd");
        queryParams.append("per_page", "15");

        const response = await request(
            `${this.endpoint}/coins/markets?${queryParams.toString()}`,
            { method: "GET" }
        ).then(res => res.json()) as CoinGeckoResponses.CoinsMarkets;

        this.exchangeRates = response.reduce((acc, coin) => ({
            ...acc,
            [coin.symbol]: { name: coin.name, rate: coin.current_price }
        }), {});
        console.log("Updated Crypto Currency Rates");
    }

    public getExchangeRate(cryptoCurrencyCode: string) {
        const currency = CoinGecko.exchangeRates[cryptoCurrencyCode];
        if (!currency) {
            throw { code: HTTP.BAD_REQUEST, message: `Unsupported crypto currency code: ${cryptoCurrencyCode}` };
        }
        return currency.rate;
    }

}

namespace CoinGeckoResponses {
    export type CoinsMarkets = CoinsMarketsCoinMetadata[];
    interface CoinsMarketsCoinMetadata {
        id: string;
        symbol: string;
        name: string;
        image: string;
        current_price: number;
        market_cap: any;
        market_cap_rank: number;
        total_volume: any;
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
