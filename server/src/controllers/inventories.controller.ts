import { Request, Response, NextFunction } from 'express';
import { APIErrorType, HttpException } from '../services/errors.service';
import { Inventory, InventoryDocument } from '../models/inventory.model';

export default {
    register: async (req: Request, res: Response, next: NextFunction) => {
        return Inventory.register(req.body).then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            next(new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message))
        })
    },
    getMany: async (req: Request, res: Response, next: NextFunction) => {
        return Inventory.find(req.params).populate({
            path: 'products',
            populate: 'product'
        }).populate({
            path: 'user'
        }).then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            next(new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message))
        })
    },
    getOne: async (req: Request, res: Response, next: NextFunction) => {
        return Inventory.findOneWithUserAndProducts({
            _id: req.params.id
        }).then(async (data: InventoryDocument) => {
            res.status(200).json(data);
        }).catch((error) => {
            next(new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message))
        })
    },
}