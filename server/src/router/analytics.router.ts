import express from 'express';
import { ticketsController } from '../controllers';
import analyticsController from '../controllers/analytics.controller';
import { bearerTokenHandler, authorizeBodyParams, validateBodyParams, requireBodyParams } from '../services/middlewares';
import { mergeValidate, validateArray, validateEach, validateObject, validateRequired, ValidatorFunction } from '../validators';

const ticketsRouter = express.Router();


ticketsRouter
    .use(bearerTokenHandler)
    .get('/',
        analyticsController.getAnalytics
    )

export default ticketsRouter;