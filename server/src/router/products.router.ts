import express from 'express';
import { productsController } from '../controllers';
import { Role } from '../models/role.model';
import { bearerTokenHandler, authorizeBodyParams, requireBodyParams, validateBodyParams, authorizeQueryParams, roleGuard } from '../services/middlewares';
import { validateRequired } from '../validators';
import { validateArray, validateNumber } from '../validators/index';

const productsRouter = express.Router();

productsRouter
    .use(bearerTokenHandler)
    .post('/',
        roleGuard([Role.ADMIN, Role.COMPANY_ADMIN]),
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
        roleGuard([Role.ADMIN, Role.COMPANY_ADMIN]),
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
    .delete('/:id',
        roleGuard([Role.ADMIN, Role.COMPANY_ADMIN]),
        productsController.deleteOne
    )
    .get('/:id',
        authorizeQueryParams({

        }),
        productsController.getOne
    )
    .post('/:id/price',
        roleGuard([Role.ADMIN, Role.COMPANY_ADMIN]),
        authorizeQueryParams({}),
        authorizeBodyParams({
            price: true
        }), requireBodyParams({
            price: true
        }),
        productsController.ammendOnePrice
    )

export default productsRouter;