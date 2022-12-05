import { NextFunction, Request, Response } from 'express';
import authService from '../services/auth.service';
// import uaParser from 'ua-parser-js';

export default {
    login: async(req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        try {
            // console.log(uaParser(req.headers['user-agent']));
            var ip = (req.headers['x-real-ip'] || req.connection.remoteAddress) as string;
            const session = await authService.loginEmail(email, password, req.headers['user-agent'] as string, ip);
            res.status(200).json({
                success: true,
                session: session
            })
        } catch(err) {
            return next(err);
        }        
    },

    register: async(req: Request, res: Response, next: NextFunction) => {
        const { firstName, lastName, email, password} = req.body;
        try {
            var ip = (req.headers['x-real-ip'] || req.connection.remoteAddress) as string;
            const session = await authService.register(firstName, lastName, email, password, req.headers['user-agent'] as string, ip);
            res.status(201).json({
                success: true,
                session: session
            });
        } catch(err) {
            return next(err);
        }
    },

    refreshToken: async(req: Request, res: Response, next: NextFunction) => {
        const { refreshToken } = req.body;        
        try {
            const session = await authService.refreshToken(refreshToken);
            res.status(201).json({
                success: true,
                session: session
            });
        } catch(err) {
            return next(err);
        }        
    }
}
