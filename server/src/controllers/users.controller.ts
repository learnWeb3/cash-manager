import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models';

export default {

    get: async(req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            const user = await UserModel.getById(id);
            res.status(200).json({
                success: true,
                status: 200,
                user: user
            });
        } catch(err) {
            return next(err);
        }
    },

    create: async(req: Request, res: Response, next: NextFunction) => {
        const { firstname, lastname, email, password} = req.body;
        try {
            const user = await UserModel.createUser(firstname, lastname, email, password);

            res.status(201).json({
                success: true,
                user: await UserModel.getById(user._id),
                status: 201
            });
        } catch(err) {
            return next(err);
        }
    },

    delete: async(req: Request, res: Response, next: NextFunction) => {
        const { current_password } = req.body;
        try {
            // const id = req.decodedToken._id;
            const user = await UserModel.getById("id");
            user.deleteUser(current_password);
            res.status(201).json({
                success: true,
                status: 204
            });
        } catch(err) {
            return next(err);
        }
    }

};

