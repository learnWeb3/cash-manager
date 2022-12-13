import express from 'express';
import { productsController } from '../controllers';
import { Role } from '../models/role.model';
import { bearerTokenHandler, authorizeBodyParams, requireBodyParams, validateBodyParams, authorizeQueryParams, roleGuard } from '../services/middlewares';
import { ProductUnit } from '../types/ProductUnit';
import { validateRequired, ValidatorFunction } from '../validators';
import { validateNumber } from '../validators/index';

const validateProductUnit: ValidatorFunction = (key: string, value: string) => {
    const errors = [];
    const authorizedProductUnitValues = Object.values(ProductUnit)
    if (!authorizedProductUnitValues.includes(value as ProductUnit)) {
        errors.push(`Invalid product unit must be one of ${authorizedProductUnitValues.join(', ')}`)
    }
    return ({
        errors,
        valid: !errors.length
    })
}

const productsRouter = express.Router();

productsRouter
    .use(bearerTokenHandler)
    .post('/',
        roleGuard([Role.ADMIN, Role.COMPANY_ADMIN]),
        authorizeBodyParams({
            unit: true,
            label: true,
            category: true,
            ref: true
        }),
        requireBodyParams({
            unit: true,
            label: true,
            category: true,
            ref: true
        }),
        validateBodyParams({
            unit: validateProductUnit,
            label: validateRequired,
            category: validateRequired,
            ref: validateRequired,
        }),
        productsController.register
    )
    .get('/', authorizeQueryParams({
        deleted: true,
        category: true
    }),
        productsController.getMany
    )
    .patch('/:id',
        roleGuard([Role.ADMIN, Role.COMPANY_ADMIN]),
        authorizeBodyParams({
            unit: true,
            label: true,
            category: true,
            ref: true
        }),
        validateBodyParams({
            unit: validateRequired,
            label: validateRequired,
            category: validateNumber,
            ref: validateRequired
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