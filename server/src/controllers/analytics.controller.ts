import { Request, Response, NextFunction } from 'express';
import { APIErrorType, HttpException } from '../services/errors.service';
import { Ticket } from '../models/ticket.model';
import { Product } from '../models/product.model';
import { Inventory } from '../models/inventory.model';

export default {
    getAnalytics: async (req: Request, res: Response, next: NextFunction) => {
        try {

            const periodicity = {
                start: +req.query.start || Date.now() - (24 * 365 * 60 * 60 * 1000),
                end: +req.query.end || Date.now() + (24 * 60 * 60 * 1000),
            }
            const ticketAnalytics = await Ticket.getAnalytics(periodicity)
            const data = {
                ticketAnalytics
            }
            res.status(200).json(data);
        } catch (error) {
            next(new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message))
        }
    }
}