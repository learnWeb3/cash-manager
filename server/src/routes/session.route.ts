import express from 'express';
import { sessionController } from '../controllers';

const sessionRouter = express.Router();

sessionRouter
        .post('/login', sessionController.login)        

export default sessionRouter;