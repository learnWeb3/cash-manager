import express from 'express';
import { userController } from '../controllers';

const userRouter = express.Router();

userRouter
        .get('/:id', userController.get)
        .post('/', userController.create)

export default userRouter;