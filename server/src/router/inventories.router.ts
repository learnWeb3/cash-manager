import express from 'express';
import { inventoriesController } from '../controllers';
import { Role } from '../models/role.model';
import { bearerTokenHandler, authorizeBodyParams, requireBodyParams, validateBodyParams, roleGuard } from '../services/middlewares';
import { mergeValidate, validateObject, validateRequired, ValidatorFunction } from '../validators';
import { validateArray, validateEach } from '../validators/index';

const inventoriesRouter = express.Router();

const validateProductFormat: ValidatorFunction = (key, value) => {
    const errors = []
    if (!value.id) {
        errors.push(`missing required property id for key ${key}`)
    }
    if (!value.quantity) {
        errors.push(`missing required property quantity for key ${key}`)
    }
    return {
        errors,
        valid: !errors.length
    }
}


inventoriesRouter
    .use(bearerTokenHandler)
    .post('/',
        roleGuard([Role.ADMIN, Role.COMPANY_ADMIN]),
        authorizeBodyParams({
            user: true,
            products: true
        }),
        requireBodyParams({
            user: true,
            products: true,
        }),
        validateBodyParams({
            user: validateRequired,
            products: (key, value) => mergeValidate(
                key,
                value,
                [
                    validateArray,
                    (key, value) => validateEach(key, value, [validateObject, validateProductFormat])
                ]
            )
        }), inventoriesController.register)
    .get('/:id', inventoriesController.getOne)
    .get('/', inventoriesController.getMany)

export default inventoriesRouter;