import express from 'express';
import { User } from '../models/user.model';
import { requireBodyParams, authorizeBodyParams, validateBodyParams } from '../middlewares/index';
import { validateRequired } from '../validators';

const sessionRouter = express.Router()


sessionRouter.post('/', authorizeBodyParams({
    email: true,
    password: true,
}), requireBodyParams({
    email: true,
    password: true,
}),
    validateBodyParams({
        email: validateRequired,
        password: validateRequired
    }),
    async (req, res, next) => {
        try {
            const data = await User.login(req.body)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    })

export default sessionRouter
