import express from "express";
import { env } from "./services/env.service";


const app = express()

app.use(express.urlencoded());
app.use(express.json());


app.listen(env.CONTAINER_PORT, '0.0.0.0', () => {
    console.log(`erver running at http://localhost:${env.CONTAINER_PORT}`)
})