import express from 'express';
import { BadRequestError } from '../errors';
import { roleGuard, validateBodyParams, authorizeBodyParams, requireBodyParams, authorizeQueryParams } from '../middlewares/index';
import { roles } from '../models/roles';
import { User } from '../models/user.model';
import { validateRequired } from '../validators';
import { Account, AccountModel } from '../models/account.model';
import { UserAccount } from '../models/user_account.model';
import { HydratedDocument } from 'mongoose';

const userRouter = express.Router()


userRouter.post('/', roleGuard({
    authorizedRoles: [roles.ADMIN, roles.MANAGER],
    userLocalsProperty: 'userId'
}), authorizeBodyParams({
    email: true,
    password: true,
    firstname: true,
    lastname: true,
    address: true,
    postcode: true,
    country: true,
    role: true,
}), requireBodyParams({
    email: true,
    password: true,
    firstname: true,
    lastname: true,
    address: true,
    postcode: true,
    country: true,
    role: true
}), validateBodyParams({
    email: validateRequired,
    password: validateRequired,
    firstname: validateRequired,
    lastname: validateRequired,
    address: validateRequired,
    postcode: validateRequired,
    country: validateRequired,
    role: validateRequired,
}), async (req, res, next) => {
    try {
        const data = await User.register(req.body);
        return res.status(201).json(data)
    } catch (error) {
        next(error)
    }
})

userRouter.put('/:id',
    authorizeBodyParams({
        email: true,
        password: true,
        firstname: true,
        lastname: true,
        address: true,
        postcode: true,
        country: true,
        role: true,
    }),
    validateBodyParams({
        email: validateRequired,
        password: validateRequired,
        firstname: validateRequired,
        lastname: validateRequired,
        address: validateRequired,
        postcode: validateRequired,
        country: validateRequired,
        role: validateRequired,
    }), roleGuard({
        authorizedRoles: [roles.ADMIN, roles.MANAGER],
        userLocalsProperty: 'userId'
    }), async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                throw new BadRequestError(`user does not exists using id ${req.params.id}`)
            }
            const data = await User.updateModel(user, req.body)
            return res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    })

userRouter.delete('/:id', roleGuard({
    authorizedRoles: [roles.ADMIN, roles.MANAGER],
    userLocalsProperty: 'userId'
}), async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || user.deleted) {
            throw new BadRequestError(`user does not exists using id ${req.params.id}`)
        }
        await User.updateModel(user, {
            deleted: true
        })
        return res.status(204).send()
    } catch (error) {
        next(error)
    }
})

userRouter.get('/', roleGuard({
    authorizedRoles: [roles.ADMIN, roles.MANAGER],
    userLocalsProperty: 'userId'
}), authorizeQueryParams({
    postcode: true,
    role: true,
    deleted: true
}), async (req, res, next) => {
    try {
        const data = await User.find(req.query);
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

userRouter.get('/:id/accounts', roleGuard({
    authorizedRoles: [roles.ADMIN, roles.MANAGER],
    userLocalsProperty: 'userId'
}), authorizeBodyParams({}), async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new BadRequestError(`user does not exists using id ${req.params.id}`)
        }
        const data = await user.listAccounts();
        return res.status(201).json(data)
    } catch (error) {
        next(error)
    }
})

userRouter.post('/:id/accounts', roleGuard({
    authorizedRoles: [roles.ADMIN, roles.MANAGER],
    userLocalsProperty: 'userId'
}), authorizeBodyParams({}), async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new BadRequestError(`user does not exists using id ${req.params.id}`)
        }
        const data = await user.registerAccount();
        return res.status(201).json(data)
    } catch (error) {
        next(error)
    }
})

userRouter.put('/:id/accounts/:accountId',
    roleGuard({
        authorizedRoles: [roles.ADMIN, roles.MANAGER],
        userLocalsProperty: 'userId'
    }),
    authorizeBodyParams({
        status: true,
        key: true,
    }), async (req, res, next) => {
        try {
            const userAccount = await UserAccount.findOne({
                user: req.params.id,
                account: req.params.accountId
            }).populate({
                path: 'account'
            });
            if (!userAccount) {
                throw new BadRequestError(`user account does not exists using id ${req.params.id} and account ${req.params.accountId}`)
            }
            const data = await Account.updateModel(userAccount.account as any, req.body)
            return res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    })


userRouter.get('/:id', async (req, res, next) => {
    try {
        const data = await User.findById(req.params.id);
        if (!data) {
            throw new BadRequestError(`user does not exists using id ${req.params.id}`)
        }
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

userRouter.get('/:id/transactions',
    authorizeQueryParams({
        sentTransactions: true,
        receivedTransactions: true
    }),
    async (req, res, next) => {
        try {
            let data = {}
            if (req.query.sentTransactions && !req.query.receivedTransactions) {
                data = await User.findById(req.params.id)
                    .populate({ path: 'sentTransactions' })
            } else if (req.query.receivedTransactions && !req.query.sentTransactions) {
                data = await User.findById(req.params.id)
                    .populate({
                        path: 'receivedTransactions'
                    })
            } else {
                data = await User.findById(req.params.id)
                    .populate({ path: 'sentTransactions' })
                    .populate({
                        path: 'receivedTransactions'
                    });
            }
            return res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    })

userRouter.get('/:id/balance', async (req, res, next) => {
    try {
        const data = await User.findById(req.params.id)
            .populate({
                path: 'accounts',
                populate: 'account'
            })
    } catch (error) {
        next(error)
    }
})


export default userRouter
