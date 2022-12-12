import express from 'express';
import analyticsController from '../controllers/analytics.controller';
import { bearerTokenHandler, authorizeQueryParams } from '../services/middlewares';

const analyticsRouter = express.Router();


analyticsRouter
    .use(bearerTokenHandler)
    .get('/',
        authorizeQueryParams({
            start: true,
            end: true
        }),
        analyticsController.getAnalytics
    )

export default analyticsRouter;