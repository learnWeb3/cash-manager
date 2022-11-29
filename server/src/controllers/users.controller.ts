import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models';
import { IUser } from '../types/IUser';
import { APIErrorType, HttpException } from '../services/errors.service';

export default {

    get: async(req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            const user = await UserModel.findById(id)
                                .select({__v: 0, updatedAt: 0, password: 0})
                                .lean();
            if (!user)
                throw new HttpException(400, APIErrorType.USER_NOT_FOUND);

            res.status(200).json({
                success: true,
                status: 200,
                user: user as IUser
            });
        } catch(err) {
            return next(err);
        }
    },

    getAll: async(req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            const users = await UserModel.find({})
                                .select({__v: 0, updatedAt: 0, password: 0})
                                .lean();

            res.status(200).json({
                success: true,
                status: 200,
                users: users as IUser[]
            });
        } catch(err) {
            return next(err);
        }
    },

    confirmEmail: async(req: Request, res: Response, next: NextFunction) => {
        try {
            
        } catch(err) {
            return next(err);
        }        
    },

    resetPassword: async(req: Request, res: Response, next: NextFunction) => {
        try {

        } catch(err) {
            return next(err);
        }        
    },

};

