import express from 'express';

const transactionRouter = express.Router()


transactionRouter.post('/', async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
})

export default transactionRouter
