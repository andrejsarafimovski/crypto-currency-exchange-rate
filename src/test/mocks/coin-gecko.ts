import * as nf from "node-fetch";
import { CoinGeckoMockResponse } from "./data";

export class CoinGeckoMock {
    public static readonly endpoint = "https://api.coingecko.com/api/v3";

    public route(url: nf.RequestInfo, init?: nf.RequestInit) {
      switch (true) {
        case url.toString().includes("coins/markets"):
          return this.getCoinsMarkets(url, init);
        default:
          throw new Error(`No mocks for ${url.toString}`);
      }
    }

    private getCoinsMarkets(url: nf.RequestInfo, init?: nf.RequestInit) {
      return CoinGeckoMockResponse.COINS_MARKETS;
    }
}
