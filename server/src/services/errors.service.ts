import { Types } from "mongoose";

export class HttpException extends Error {
    status: number;
    code: APIErrorType;
    message: string

    constructor(status: number, code: APIErrorType, message = 'HttpException') {
        super(message);
        this.name = "HttpException";
        this.status = status;
        this.code = code;
    }
}

export interface JwtRequest extends Request {
    decoded: {
        _id: Types.ObjectId,
        role: string
    }
}

export interface IErrorCode {
    code: APIErrorType,
    info?: string
}

export interface IAPIError {
    success: false;
    status: number;
    errors: Array<IErrorCode>
}

export enum APIErrorType {
    API_INTERNAL_ERROR = 'INTERNAL_SERVER_ERROR',
    API_ROUTE_NOT_FOUND = 'API_INVALID_ROUTE',
    API_BAD_REQUEST = "BAD_REQUEST",
    API_UNAUTHORIZED = "BAD_UNAUTHORIZED",
    AUTH_INVALID_PASSWORD = 'AUTH_INVALID_PASSWORD',

    DATABASE_EXISTING_FIELD = "DATABASE_EXISTING_FIELD",

    SESSION_INVALID_TOKEN = 'SESSION_INVALID_TOKEN',
    SESSION_INVALID_REFRESH_TOKEN = 'SESSION_INVALID_REFRESH_TOKEN',
    SESSION_INVALID_USER = 'SESSION_INVALID_USER',
    SESSION_INVALID_IP = 'SESSION_INVALID_IP',
    SESSION_INVALID_USER_AGENT = 'SESSION_INVALID_USER_AGENT',

    USER_NOT_FOUND = 'USER_NOT_FOUND',
    USER_INVALID_FIRSTNAME = 'USER_INVALID_FIRSTNAME',
    USER_INVALID_LASTNAME = 'USER_INVALID_LASTNAME',
    USER_INVALID_PASSWORD = 'USER_INVALID_PASSWORD',
    USER_INVALID_EMAIL_ADRESSE = 'USER_INVALID_EMAIL_ADRESSE',
    USER_INVALID_PHONE_SYNTAX = 'USER_INVALID_PHONE_SYNTAX'
}