import express from 'express';
import cors, { CorsOptions } from 'cors';

import env from './services/env.service';
import router from './router'

import { errorHandler, notFoundHandler } from './services/middlewares';
import { connectDatabase } from './services/mongoose/database.service';

const app = express();

<<<<<<< HEAD
app.disable('X-Powered-By');

const options: CorsOptions = {
  origin: [env.CLIENT_URL],
  optionsSuccessStatus: 200,
  methods: ["GET", "PATCH", "POST", "DELETE"]
};
app.use(cors(options));

=======
app.use(express.urlencoded({
    extended: false
}));
>>>>>>> ee4c0e3ce9e62658c0dcbeae585ad23f794330ff
app.use(express.json());

app.use('/api', router);

app.use(notFoundHandler);
app.use(errorHandler);

app.use(errorHandler)


connectDatabase().then((conneciton) => {
    app.listen(env.PORT, '0.0.0.0', () => {
        console.log(`server running at http://localhost:${env.PORT}`)
    })
})