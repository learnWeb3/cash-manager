import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models';
import jsonwebtoken from 'jsonwebtoken';

export default {

    login: async(req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        try {
            const user = await UserModel.findOne({email: email});
            if (!user || !user.comparePassword(password))
                throw new Error('Bad credential');
            
            const token = jsonwebtoken.sign({
                    _id: user._id, 
                    role_id: user.role_id
                }, process.env.JWT_SECRET, { expiresIn: '9999 years' }
            );
            
            res.status(200).json({
                success: true,
                status: 200,
                token: token
            });
        } catch(err) {
            return next(err);
        }
    }

};

