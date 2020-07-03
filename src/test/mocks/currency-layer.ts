import * as nf from "node-fetch";
import { CurrencyLayerMockResponse } from "./data";

export class CurrencyLayerMock {
    public static readonly endpoint = "http://api.currencylayer.com";

    public route(url: nf.RequestInfo, init?: nf.RequestInit) {
        switch (true) {
            case url.toString().includes("live"):
                return this.getLive(url, init);
            default:
                throw new Error(`No mocks for ${url.toString}`);
        }
    }

    private getLive(url: nf.RequestInfo, init?: nf.RequestInit) {
        return CurrencyLayerMockResponse.LIVE;
    }
}
