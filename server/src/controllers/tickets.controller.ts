import { Request, Response, NextFunction } from 'express';
import { APIErrorType, HttpException } from '../services/errors.service';
import { Ticket } from '../models/ticket.model';

export default {
    register: async (req: Request, res: Response, next: NextFunction) => {
        return Ticket.register(req.body).then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            next(new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message))
        })
    },
    getMany: async (req: Request, res: Response, next: NextFunction) => {
        return Ticket.find(req.params)
            .populate({
                path: 'user'
            })
            .populate({
                path: 'products',
                populate: 'product'
            })
            .then((data) => {
                res.status(200).json(data);
            }).catch((error) => {
                next(new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message))
            })
    },
    getOne: async (req: Request, res: Response, next: NextFunction) => {
        return Ticket.findOneWithUserAndProducts({
            _id: req.params.id,
        }).then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            next(new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message))
        })
    },
}