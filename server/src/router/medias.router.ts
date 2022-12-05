import express from 'express';
import { mediasController } from '../controllers';
import { bearerTokenHandler } from '../services/middlewares';

const inventoriesRouter = express.Router();

inventoriesRouter
    .use(bearerTokenHandler)
    .post('/',)
    .get('/',)

export default inventoriesRouter;