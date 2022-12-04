import express from 'express';
import { productsController } from '../controllers';
import { bearerTokenHandler, authorizeBodyParams, requireBodyParams, validateBodyParams, authorizeQueryParams } from '../services/middlewares';
import { validateRequired } from '../validators';
import { validateArray, validateNumber } from '../validators/index';

const productsRouter = express.Router();

productsRouter
    .use(bearerTokenHandler)
    .post('/',
        authorizeBodyParams({
            unit: true,
            label: true,
            category: true
        }),
        requireBodyParams({
            unit: true,
            label: true,
            category: true
        }),
        validateBodyParams({
            unit: validateRequired,
            label: validateRequired,
            category: validateNumber,
        }),
        productsController.register
    )
    .get('/', authorizeQueryParams({
        category: true
    }),
        productsController.getMany
    )
    .patch('/:id',
        authorizeBodyParams({
            unit: true,
            label: true,
            category: true
        }),
        validateBodyParams({
            unit: validateRequired,
            label: validateRequired,
            category: validateNumber,
        }),
        productsController.ammendOne
    )
    .delete('/:id', productsController.deleteOne)
    .get('/:id',
        authorizeQueryParams({

        }),
        productsController.getOne
    )
    .post('/:id/price',
        authorizeQueryParams({}),
        authorizeBodyParams({
            price: true
        }), requireBodyParams({
            price: true
        }),
        productsController.ammendOnePrice
    )

export default productsRouter;