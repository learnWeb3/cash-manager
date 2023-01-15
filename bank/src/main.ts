import express from "express";
import { env } from "./services/env.service";
import {
  errorHandler,
  expressJwtOptions,
  jsonBodyParsingOptions,
  parseJWTToken,
} from "./middlewares/index";
import transactionRouter from "./routers/transaction.router";
import userRouter from "./routers/users.router";
import jwt from "express-jwt";
import sessionRouter from "./routers/sessions.router";
import { Db } from "./services/database.service";

Db.connect()
  .then((connection) => {
    console.log(`database connection opened at ${env.DATABASE_URI}`);

    const app = express();

    app.use(
      express.urlencoded({
        extended: false,
      })
    );
    app.use(express.json(jsonBodyParsingOptions));
    app.use(jwt(expressJwtOptions).unless({ path: ["/sessions"] }));
    app.use(parseJWTToken());
    app.use(env.PATH_PREFIX + "/sessions", sessionRouter);
    app.use(env.PATH_PREFIX + "/users", userRouter);
    app.use(env.PATH_PREFIX + "/transactions", transactionRouter);
    app.get("/", async (req, res, next) => {
      return res.status(200).send();
    });
    app.use(errorHandler);
    app.listen(env.CONTAINER_PORT, "0.0.0.0", () => {
      console.log(`server running at http://localhost:${env.CONTAINER_PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
