import { SessionModel, UserModel } from "../models";
import { ISession } from "../types/ISession";
import { APIErrorType, HttpException } from "./errors.service";

export default {

    async loginEmail(email: string, password: string, userAgent: string, userIp: string): Promise<ISession> {
        const user = await UserModel.findOne({'emails.address': email})
                                    .select({_id: 1, password: 1, role: 1, perms: 1});

        if (!user || !(user.comparePassword(password)))
            throw new HttpException(401, APIErrorType.AUTH_INVALID_PASSWORD);
            
        return await SessionModel.createSession(user._id, userAgent, userIp);
    },

    async register(firstName: string, lastName: string, email: string, password: string, userAgent: string, userIp: string): Promise<ISession> {        
        const user = await UserModel.createUser(firstName, lastName, email, password);
        return await SessionModel.createSession(user._id, userAgent, userIp);
    },

    async refreshToken(refreshToken: string) {
        const session = await SessionModel.findOne({refreshToken: refreshToken})
                                        .select({user: 1})
        if (!session)
            throw new HttpException(401, APIErrorType.SESSION_INVALID_REFRESH_TOKEN);
        return await session.refresh();
    },

};