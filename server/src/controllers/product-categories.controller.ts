import { Request, Response, NextFunction } from 'express';
import { APIErrorType, HttpException } from '../services/errors.service';
import { ProductCategory } from '../models/product-category.model';

export default {
    register: async (req: Request, res: Response, next: NextFunction) => {
        return ProductCategory.register(req.body).then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            next(new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message))
        })
    },
    getMany: async (req: Request, res: Response, next: NextFunction) => {
        return ProductCategory.find(req.params)
            .populate({
                path: 'products'
            })
            .then((data) => {
                res.status(200).json(data);
            }).catch((error) => {
                next(new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message))
            })
    },
    getOne: async (req: Request, res: Response, next: NextFunction) => {
        return ProductCategory.findOne({
            _id: req.params.id,
        }).populate({
            path: 'products'
        }).then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            next(new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message))
        })
    },
}