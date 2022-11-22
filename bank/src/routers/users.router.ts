import express from 'express';
import { roleGuard } from '../middlewares/index';
import { roles } from '../models/roles';

const userRouter = express.Router()


userRouter.post('/', roleGuard({
    authorizedRoles: [roles.ADMIN, roles.MANAGER],
    userLocalsProperty: 'role'
}), async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
})

userRouter.put('/:id', roleGuard({
    authorizedRoles: [roles.ADMIN, roles.MANAGER],
    userLocalsProperty: 'role'
}), async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
})

userRouter.delete('/:id', roleGuard({
    authorizedRoles: [roles.ADMIN, roles.MANAGER],
    userLocalsProperty: 'role'
}), async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
})

userRouter.get('/', roleGuard({
    authorizedRoles: [roles.ADMIN, roles.MANAGER],
    userLocalsProperty: 'role'
}), async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
})

userRouter.get('/:id', async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
})

userRouter.get('/:id/transactions', async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
})

userRouter.get('/:id/balance', async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
})


export default userRouter
