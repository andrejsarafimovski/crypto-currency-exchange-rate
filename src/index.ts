import express from "express";
import HTTP from "http-status-codes";
import { config } from "./config";
import { codedError, validation } from "./lib";
import { Exchange } from "./models/exchange-model";
import { Dictionary } from "./types";


const app = express();
const MILLISECONDS_IN_A_MINUTE = 60000;

app.get("/exchange-rate",
    validation("getExchangeRates"),
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
            return res.send(
                err.code && err.message ?
                    err : codedError(HTTP.INTERNAL_SERVER_ERROR, "Internal Server Error")
            );
        }
    }
);

export async function startServer() {
    await Exchange.updateExchangeRates();
    setInterval(Exchange.updateExchangeRates, config.updateExchangeRateInterval * MILLISECONDS_IN_A_MINUTE);
    app.listen(config.PORT, () => {
        console.log(`Server listening on ${config.PORT}`);
    });
}

startServer();
