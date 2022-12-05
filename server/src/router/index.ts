import express from 'express';
import authRouter from './auth.router';
import usersRouter from './users.router';
import inventoriesRouter from './inventories.router';
import productsRouter from './products.router';
import mediasRouter from './medias.router';
import ticketsRouter from './tickets.router';
import productCategoriesRouter from './product-categories.router';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/product-categories', productCategoriesRouter)
router.use('/products', productsRouter)
router.use('/tickets', ticketsRouter)
router.use('/medias', mediasRouter)
router.use('/inventories', inventoriesRouter)

export default router;