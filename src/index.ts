import express from 'express';
import HTTP from 'http-status-codes';
import { config } from './config';
import { codedError, validation } from './lib';
import { Exchange } from './models/exchange-model';
import { Dictionary } from './types';


const app = express();
const MILLISECONDS_IN_A_MINUTE = 60000;

app.get('/exchange-rate',
  validation('getExchangeRates'),
  async (req, res) => {
    try {
      const { cryptoCurrencyCode, flatCurrencyCode, manualResync } = req.query as Dictionary<string>;
      if (manualResync) {
        await Exchange.updateExchangeRates();
      }
      return res.send(new Exchange().getExchangeRate(
        cryptoCurrencyCode.toLowerCase(),
        flatCurrencyCode.toUpperCase(),
      ));
    } catch (err) {
      if (err.code && err.message) {
        return res.status(err.code).send(err);
      }
      return res.status(HTTP.INTERNAL_SERVER_ERROR)
        .send(codedError(HTTP.INTERNAL_SERVER_ERROR, 'Internal Server Error'));
    }
  },
);

export async function startServer(): Promise<void> {
  try {
    await Exchange.updateExchangeRates();
    setInterval(Exchange.updateExchangeRates, config.updateExchangeRateInterval * MILLISECONDS_IN_A_MINUTE);
    app.listen(config.PORT);
    return;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}
