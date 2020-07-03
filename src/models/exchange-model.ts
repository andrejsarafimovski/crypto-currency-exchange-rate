import { CoinGecko, CurrencyLayer } from '../integrations';

export class Exchange {
  private readonly coinGecko = new CoinGecko();

  private readonly currencyLayer = new CurrencyLayer();

  private static lastUpdated = 0;

  public static async updateExchangeRates(): Promise<void> {
    await Promise.all([
      CoinGecko.updateExchangeRates(),
      CurrencyLayer.updateExchangeRates(),
    ]);
    this.lastUpdated = Date.now();
    return;
  }

  public getExchangeRate(cryptoCurrencyCode: string, flatCurrencyCode: string): {
    cryptoCurrencyCode: string;
    flatCurrencyCode: string;
    exchangeRate: number;
    lastUpdate: number;
  } {
    const cryptoExchangeRate = this.coinGecko.getExchangeRate(cryptoCurrencyCode);
    const flatExchangeRate = this.currencyLayer.getExchangeRate(flatCurrencyCode);
    return {
      cryptoCurrencyCode,
      flatCurrencyCode,
      exchangeRate: cryptoExchangeRate * flatExchangeRate,
      lastUpdate: Exchange.lastUpdated,
    };
  }
}
