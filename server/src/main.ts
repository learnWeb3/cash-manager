import express from 'express';
import { errorHandler, notFoundHandler } from './services/middlewares';
import { connectDatabase } from './services/mongoose/database.service';
import env from './services/env.service';
import router from './router'

const app = express();

app.use(express.urlencoded({
    extended: false
}));
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