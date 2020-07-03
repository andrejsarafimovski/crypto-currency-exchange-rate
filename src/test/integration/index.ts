import { assert } from "chai";
import HTTP from "http-status-codes";
import { CryptoCurrencyExchangeRateApi } from "../../sdk/axios";
import { errorTest } from "../lib";

describe("Integration Tests", () => {

  let service: CryptoCurrencyExchangeRateApi;
  let serverAddress: string;

  before(() => {
    serverAddress = `http://localhost:${process.env.PORT}`;
    service = new CryptoCurrencyExchangeRateApi({}, serverAddress);
  });

  it("Should be able to get exchange rate for USD and BTC", async () => {
    const { data: response1 } = await service.getExchangeRate("btc", "usd");
    assert.exists(response1.cryptoCurrencyCode);
    assert.exists(response1.flatCurrencyCode);
    assert.exists(response1.exchangeRate);
    assert.exists(response1.lastUpdate);

    const { data: response2 } = await service.getExchangeRate("btc", "usd", true);
    assert.exists(response1.cryptoCurrencyCode);
    assert.exists(response1.flatCurrencyCode);
    assert.exists(response1.exchangeRate);
    assert.notEqual(response1.lastUpdate, response2.lastUpdate);
  });

  it("Should be able to get exchange rate for AFN and ETH", async () => {

    const { data: response1 } = await service.getExchangeRate("eth", "afn");
    assert.exists(response1.cryptoCurrencyCode);
    assert.exists(response1.flatCurrencyCode);
    assert.exists(response1.exchangeRate);
    assert.exists(response1.lastUpdate);

    const { data: response2 } = await service.getExchangeRate("eth", "afn", true);
    assert.exists(response1.cryptoCurrencyCode);
    assert.exists(response1.flatCurrencyCode);
    assert.exists(response1.exchangeRate);
    assert.notEqual(response1.lastUpdate, response2.lastUpdate);
  });

  it("Should be able to get exchange rate for AMD and ADA", async () => {

    const { data: response1 } = await service.getExchangeRate("ada", "amd");
    assert.exists(response1.cryptoCurrencyCode);
    assert.exists(response1.flatCurrencyCode);
    assert.exists(response1.exchangeRate);
    assert.exists(response1.lastUpdate);

    const { data: response2 } = await service.getExchangeRate("ada", "amd", true);
    assert.exists(response1.cryptoCurrencyCode);
    assert.exists(response1.flatCurrencyCode);
    assert.exists(response1.exchangeRate);
    assert.notEqual(response1.lastUpdate, response2.lastUpdate);
  });

  it("Should be able to get exchange rate for BGN and XRP", async () => {

    const { data: response1 } = await service.getExchangeRate("xrp", "bgn");
    assert.exists(response1.cryptoCurrencyCode);
    assert.exists(response1.flatCurrencyCode);
    assert.exists(response1.exchangeRate);
    assert.exists(response1.lastUpdate);

    const { data: response2 } = await service.getExchangeRate("xrp", "bgn", true);
    assert.exists(response1.cryptoCurrencyCode);
    assert.exists(response1.flatCurrencyCode);
    assert.exists(response1.exchangeRate);
    assert.notEqual(response1.lastUpdate, response2.lastUpdate);
  });

  it("Should be able to get exchange rate for EUR and BCH", async () => {

    const { data: response1 } = await service.getExchangeRate("bch", "eur");
    assert.exists(response1.cryptoCurrencyCode);
    assert.exists(response1.flatCurrencyCode);
    assert.exists(response1.exchangeRate);
    assert.exists(response1.lastUpdate);

    const { data: response2 } = await service.getExchangeRate("bch", "eur", true);
    assert.exists(response1.cryptoCurrencyCode);
    assert.exists(response1.flatCurrencyCode);
    assert.exists(response1.exchangeRate);
    assert.notEqual(response1.lastUpdate, response2.lastUpdate);
  });

  it("Should not be able to get exchange rate with currency codes larger than 3 letters", async () => {
    await errorTest(
      service.getExchangeRate("bitcoin", "eur"),
      HTTP.BAD_REQUEST,
      "Crypto Currency code is larger than 3 letters",
    );
    await errorTest(
      service.getExchangeRate("etherium", "eur"),
      HTTP.BAD_REQUEST,
      "Crypto Currency code is larger than 3 letters",
    );
    await errorTest(
      service.getExchangeRate("eth", "euro"),
      HTTP.BAD_REQUEST,
      "Flat Currency code is larger than 3 letters",
    );
    await errorTest(
      service.getExchangeRate("btc", "US Dollar"),
      HTTP.BAD_REQUEST,
      "Flat Currency code is larger than 3 letters",
    );
  });

  it("Should not be able to get exchange rate with currency codes smaller than 3 letters", async () => {
    await errorTest(
      service.getExchangeRate("bt", "eur"),
      HTTP.BAD_REQUEST,
      "Crypto Currency code is smaller than 3 letters",
    );
    await errorTest(
      service.getExchangeRate("et", "eur"),
      HTTP.BAD_REQUEST,
      "Crypto Currency code is smaller than 3 letters",
    );
    await errorTest(
      service.getExchangeRate("eth", "e"),
      HTTP.BAD_REQUEST,
      "Flat Currency code is smaller than 3 letters",
    );
    await errorTest(
      service.getExchangeRate("btc", "D"),
      HTTP.BAD_REQUEST,
      "Flat Currency code is smaller than 3 letters",
    );
  });

  it("Should be able to get exchange rate with no currency codes", async () => {
    await errorTest(
      service.getExchangeRate("", "e"),
      HTTP.BAD_REQUEST,
      "Crypto Currency code is an empty string",
    );
    await errorTest(
      service.getExchangeRate("btc", ""),
      HTTP.BAD_REQUEST,
      "Flat Currency code is an empty string",
    );
    await errorTest(
      service.getExchangeRate("", "e"),
      HTTP.BAD_REQUEST,
      "Crypto Currency code is an empty string and Flat Currency Code is smaller than 3 letters",
    );
    await errorTest(
      service.getExchangeRate("btc", ""),
      HTTP.BAD_REQUEST,
      "Flat Currency code is an empty string",
    );
  });

  it("Should be able to get exchange rate with unsupported currency codes", async () => {
    await errorTest(
      service.getExchangeRate("ebr", "mkd"),
      HTTP.BAD_REQUEST,
      "Currencies are not supported",
    );
    await errorTest(
      service.getExchangeRate("rts", "rts"),
      HTTP.BAD_REQUEST,
      "Currencies are not supported",
    );
    await errorTest(
      service.getExchangeRate("vvk", "aws"),
      HTTP.BAD_REQUEST,
      "Currencies are not supported",
    );
  });

});
