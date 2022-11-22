import express from "express";
import { env } from "./services/env.service";
import { errorHandler, expressJwtOptions } from "./middlewares/index";
import { connectDatabase } from "./services/database.service";
// import expressjwt from "express-jwt";
import router from "./routes";

(async() => {
    await connectDatabase();
    const app = express()

    app.use(express.urlencoded());
    app.use(express.json());
    // app.use(expressjwt(expressJwtOptions).unless({ path: ["/session"] }));
    app.use(router);

    app.use(errorHandler)
    app.listen(env.CONTAINER_PORT, "0.0.0.0", () => {
        console.log(`erver running at http://localhost:${env.CONTAINER_PORT}`)
    })
})()
