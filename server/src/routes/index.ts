import express from 'express';
import sessionRouter from './session.route';
import userRouter from './user.route';

const router = express.Router();

router.use('/api/users', userRouter);
router.use('/api/session', sessionRouter);

export default router;