import { Request, Response, NextFunction } from 'express';
import { Media } from '../models/media.model';
import { APIErrorType, HttpException } from '../services/errors.service';

export default {
    register: async (req: Request, res: Response, next: NextFunction) => {
        return Media.register(req.file).then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            next(new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message))
        })
    },
    getMany: async (req: Request, res: Response, next: NextFunction) => {
        return Media.find({})
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((error) => {
                next(new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message))
            })
    },
    getOne: async (req: Request, res: Response, next: NextFunction) => {
        return Media.findOne({
            _id: req.params.id
        }).then((data) => {
            res.status(200).json(data);
        }).catch((error) => {
            next(new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message))
        })
    },
}