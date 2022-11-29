import express from 'express';
import { productsController } from '../controllers';
import { bearerTokenHandler } from '../services/middlewares';

const productsRouter = express.Router();

productsRouter
    .use(bearerTokenHandler)
    .post('/',)
    .get('/',)
    .patch('/:id',)
    .delete('/:id',)
    .get('/:id',)
    .post('/:id/price', )

export default productsRouter;