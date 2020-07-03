process.env.NODE_ENV = "test";
process.env.PORT = "8000";
process.env.currencyLayerAccessKey = "currencyLayerAccessKeyTest";

import "./mocks/node-fetch";

// tslint:disable
import { startServer } from "../";

before(async () => {
    console.info("BEFORE");
    await startServer();
});

after(() => {
    console.info("AFTER");
    process.exit(0);
});
