import { Document } from "mongodb";
import { Model, Types } from "mongoose";

export interface DecodedToken {
    seesion: string;
    _id: string;
    role: string;
}

export interface ISession extends Document {
    _id?: Types.ObjectId;
    accessToken?: string;
	refreshToken: string;
	user: Types.ObjectId;
    devices: [{
        userAgent: string;
        ip: string;
    }]
}

export interface ISessionDocument extends ISession, Document {
    sign(): Promise<string>;
    refresh(): Promise<ISession>;
    newIpAddress(): void;
}

export interface ISessionModel extends Model<ISessionDocument> {
	createSession(userId: Types.ObjectId, userAgent: string, userIp: string): Promise<ISession>;
    decode(token: string): Promise<DecodedToken>;
}