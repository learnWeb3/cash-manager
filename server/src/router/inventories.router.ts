import express from 'express';
import { inventoriesController } from '../controllers';
import { bearerTokenHandler } from '../services/middlewares';

const inventoriesRouter = express.Router();

inventoriesRouter
    .use(bearerTokenHandler)
    .post('/',)
    .get('/:id',)
    .get('/',)
    .get('/current',)

export default inventoriesRouter;