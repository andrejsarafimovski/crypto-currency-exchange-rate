import { CoinGecko, CurrencyLayer } from "../integrations";

export class Exchange {
    private readonly coinGecko = new CoinGecko();
    private readonly currencyLayer = new CurrencyLayer();
    private static lastUpdated: number = 0;

    public static async updateExchangeRates() {
        console.log("Updating Rates");
        await Promise.all([
            CoinGecko.updateExchangeRates(),
            CurrencyLayer.updateExchangeRates()
        ]);
        this.lastUpdated = Date.now();
        console.log("Updated Rates");
    }

    public getExchangeRate(cryptoCurrencyCode: string, flatCurrencyCode: string) {
        const cryptoExchangeRate = this.coinGecko.getExchangeRate(cryptoCurrencyCode);
        const flatExchangeRate = this.currencyLayer.getExchangeRate(flatCurrencyCode);
        return {
            cryptoCurrencyCode,
            flatCurrencyCode,
            exchangeRate: cryptoExchangeRate * flatExchangeRate,
            lastUpdate: Exchange.lastUpdated
        };
    }
}
