import express from 'express';
import { userController } from '../controllers';
import { bearerTokenHandler } from '../services/middlewares';

const usersRouter = express.Router();

usersRouter
    .use(bearerTokenHandler)
    .get('/', userController.getAll)
    .get('/:id', userController.get)
    .post('/confirmEmail', userController.confirmEmail)
    .post('/resetPassword', userController.resetPassword)
    // .delete()

export default usersRouter;