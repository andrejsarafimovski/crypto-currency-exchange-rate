import HTTP from "http-status-codes";
import mockRequire from "mock-require";
import * as nf from "node-fetch";
import { CoinGeckoMock } from "./coin-gecko";
import { CurrencyLayerMock } from "./currency-layer";

async function requestMock(url: nf.RequestInfo, init?: nf.RequestInit) {
    let response: any;
    switch (true) {
        case url.toString().includes(CoinGeckoMock.endpoint): {
            response = new CoinGeckoMock().route(url, init);
            break;
        }
        case url.toString().includes(CurrencyLayerMock.endpoint): {
            response = new CurrencyLayerMock().route(url, init);
            break;
        }
        default: {
            throw new Error(`No mocks for ${url.toString}`);
        }
    }
    return Promise.resolve({
        status: HTTP.OK,
        json: () => {
            return Promise.resolve(response);
        }
    });
}

(nf.default as any) = requestMock;
mockRequire("node-fetch", nf);
