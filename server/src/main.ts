import express from 'express';
import cors, { CorsOptions } from 'cors';

import env from './services/env.service';
import router from './router'

import { errorHandler, notFoundHandler } from './services/middlewares';
import { connectDatabase } from './services/mongoose/database.service';

const app = express();

app.disable('X-Powered-By');

const options: CorsOptions = {
  origin: [env.CLIENT_URL],
  optionsSuccessStatus: 200,
  methods: ["GET", "PATCH", "POST", "DELETE"]
};
app.use(cors(options));

app.use(express.json());
app.use(express.static('public/upload'))

app.use('/api', router);

app.use(notFoundHandler);
app.use(errorHandler);

connectDatabase().then((conneciton) => {
    app.listen(env.PORT, () => {
        console.log(`server running at http://localhost:${env.PORT}`)
    })
})