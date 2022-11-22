import express from "express";
import { env } from "./services/env.service";
import { errorHandler, expressJwtOptions, jsonBodyParsingOptions, parseJWTToken, roleGuard } from './middlewares/index';
import transactionRouter from './routers/transaction.router';
import userRouter from './routers/users.router';
import jwt from 'express-jwt'
import sessionRouter from './routers/sessions.router';
import { Db } from './services/database.service';

const app = express()

app.use(express.urlencoded());
app.use(express.json(jsonBodyParsingOptions));

app.use(jwt(expressJwtOptions))

app.use(parseJWTToken())


app.use('/sessions', sessionRouter)
app.use('/users', userRouter)
app.use('/transactions', transactionRouter)

app.use(errorHandler)


Db.connect().then((connection) => {
    console.log(`database connection opened at mongodb://${env.DATABASE_HOST}:${env.DATABASE_PORT}/${env.DATABASE_NAME}`)
    app.listen(env.CONTAINER_PORT, '0.0.0.0', () => {
        console.log(`server running at http://localhost:${env.CONTAINER_PORT}`)
    })
}).catch((error) => {
    console.log(error)
});
