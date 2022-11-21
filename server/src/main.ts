import express from "express";
import { env } from "./services/env.service";
import { errorHandler } from './middlewares/index';


const app = express()

app.use(express.urlencoded());
app.use(express.json());



app.use(errorHandler)
app.listen(env.CONTAINER_PORT, '0.0.0.0', () => {
    console.log(`erver running at http://localhost:${env.CONTAINER_PORT}`)
})