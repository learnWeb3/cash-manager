import { Request, Response, NextFunction } from 'express';
import { APIErrorType, HttpException } from '../services/errors.service';
import { Ticket } from '../models/ticket.model';
import { Product } from '../models/product.model';
import { Inventory } from '../models/inventory.model';

export default {
    getAnalytics: async (req: Request, res: Response, next: NextFunction) => {
        try {

            const periodicity = {
                start: +req.query.start || Date.now() / 1000,
                end: +req.query.end || Date.now() / 1000 - (24 * 7 * 60 * 60)
            }
            const ticketAnalytics = await Ticket.getAnalytics(periodicity)
            const productAnalytics = await Product.getAnalytics(periodicity)
            const inventoryAnalytics = await Inventory.getAnalytics(periodicity)
            const data = {
                ticketAnalytics,
                productAnalytics,
                inventoryAnalytics
            }
            res.status(200).json(data);
        } catch (error) {
            next(new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message))
        }
    }
}