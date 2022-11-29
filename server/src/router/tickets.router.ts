import express from 'express';
import { ticketsController } from '../controllers';
import { bearerTokenHandler } from '../services/middlewares';

const ticketsRouter = express.Router();

ticketsRouter
    .use(bearerTokenHandler)
    .get('/',)
    .get('/:id',)
    .post('/:id/validate',)

export default ticketsRouter;