import express from 'express';
import { Transaction } from '../models/transaction.model';
import { roleGuard, requireBodyParams, authorizeBodyParams, validateBodyParams } from '../middlewares/index';
import { roles } from '../models/roles';
import { validateRequired } from '../validators';

const transactionRouter = express.Router()


transactionRouter.post('/', roleGuard({
    authorizedRoles: [roles.MERCHANT, roles.MANAGER, roles.ADMIN],
    userLocalsProperty: 'userId'
}),
    authorizeBodyParams({
        from: true,
        to: true,
        amount: true,
        signature: true
    }),
    requireBodyParams({
        from: true,
        to: true,
        amount: true,
        signature: true
    }),
    validateBodyParams({
        from: validateRequired,
        to: validateRequired,
        amount: validateRequired,
        signature: validateRequired
    }),
    async (req, res, next) => {
        try {
            const data = await Transaction.register(req.body);
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    })

export default transactionRouter
