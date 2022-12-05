import express from 'express';
import { ticketsController } from '../controllers';
import { bearerTokenHandler, authorizeBodyParams, validateBodyParams, requireBodyParams } from '../services/middlewares';
import { mergeValidate, validateArray, validateEach, validateObject, validateRequired, ValidatorFunction } from '../validators';

const ticketsRouter = express.Router();

const validateProductFormat: ValidatorFunction = (key, value) => {
    const errors = []
    if (!value.id) {
        errors.push(`missing required property id for key ${key}`)
    }
    if (value.quantity) {
        errors.push(`missing required property quantity for key ${key}`)
    }
    return {
        errors,
        valid: !errors.length
    }
}

ticketsRouter
    .use(bearerTokenHandler)
    .get('/',
        ticketsController.getMany
    )
    .get('/:id',
        ticketsController.getOne
    )
    .post('/',
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
        }),
        ticketsController.register
    )
    .post('/:id/validate',)

export default ticketsRouter;