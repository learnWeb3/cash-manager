import express from 'express';
import { errorHandler, notFoundHandler } from './services/middlewares';
import { connectDatabase } from './services/mongoose/database.service';
import env from './services/env.service';
import router from './router'

const app = express();

app.disable('X-Powered-By');
app.use(express.json());

app.use('/api', router);

app.use(notFoundHandler);
app.use(errorHandler);

connectDatabase().then(() => {
    const port = parseInt(env.PORT);
    app.listen(port, () => console.log(`[ExpressJS] Server successfully started on: ${port}`));
});