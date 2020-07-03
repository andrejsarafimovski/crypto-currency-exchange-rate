import express from "express";
import { config } from "./config";
import { Exchange } from "./models/exchange-model";

const app = express();
interface Dictionary<T> {
    [key: string]: T;
}
const MILLISECONDS_IN_A_MINUTE = 60000;

app.get("/exchange-rate",
    async (req, res) => {
        try {
            const { cryptoCurrencyCode, flatCurrencyCode, manualResync } = req.query as Dictionary<string>;
            if (manualResync) {
                await Exchange.updateExchangeRates();
            }
            return res.send(new Exchange().getExchangeRate(
                cryptoCurrencyCode.toLowerCase(),
                flatCurrencyCode.toUpperCase()
            ));
        } catch (err) {
            console.error(JSON.stringify(err));
            return res.send(err);
        }
    }
);

async function startServer() {
    await Exchange.updateExchangeRates();
    setInterval(Exchange.updateExchangeRates, config.updateExchangeRateInterval * MILLISECONDS_IN_A_MINUTE);
    app.listen(config.PORT, () => {
        console.log(`Server listening on ${config.PORT}`);
    });
}

startServer();
