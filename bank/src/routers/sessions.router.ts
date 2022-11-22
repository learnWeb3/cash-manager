import express from 'express';

const sessionRouter = express.Router()


sessionRouter.post('/', async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
})

export default sessionRouter
