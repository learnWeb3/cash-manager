import express from 'express';
import productCategoriesController from '../controllers/product-categories.controller';
import { bearerTokenHandler, authorizeBodyParams, requireBodyParams, validateBodyParams } from '../services/middlewares';
import { validateRequired } from '../validators';

const productCategoriesRouter = express.Router();

productCategoriesRouter
    .use(bearerTokenHandler)
    .get('/',
        productCategoriesController.getMany
    )
    .get('/:id',
        productCategoriesController.getOne
    )
    .post('/',
        authorizeBodyParams({
            label: true
        }),
        requireBodyParams({
            label: true
        }),
        validateBodyParams({
            label: validateRequired
        }),
        productCategoriesController.register
    )
    .post('/:id/validate',)

export default productCategoriesRouter;