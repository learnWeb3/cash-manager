import { Request, Response, NextFunction } from 'express';
import {MongoServerError } from 'mongodb';
import { Error as MongooseError } from 'mongoose';
import { SessionModel } from '../models';
import { ValidatorFunction } from '../validators';
import { HttpException, APIErrorType, IAPIError, IErrorCode } from './errors.service';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    next(new HttpException(404, APIErrorType.API_ROUTE_NOT_FOUND));
}

export const errorHandler = (error: HttpException | MongooseError, req: Request, res: Response, next: NextFunction) => {
    const response: IAPIError = { success: false, status: 500, errors: [{ code: APIErrorType.API_INTERNAL_ERROR }] };

    if (error.name == "HttpException") {
        const httpException = error as HttpException;
        response.status = httpException.status;
        response.errors = [{ code: httpException.code }];

    } else if (error.name == "MongoServerError") {
        const mongooseException = error as MongoServerError;
        if (mongooseException["code"] == 11000) {
            response.status = 400;
            response.errors = [{
                code: APIErrorType.DATABASE_EXISTING_FIELD,
                info: Object.values(mongooseException.keyValue)[0] as string
            }];
        }

    } else if (error.name == "ValidationError") {
        const mongooseException = error as MongooseError.ValidationError;
        const errorCodes = Object.values(mongooseException.errors);
        response.status = 400;
        response.errors = errorCodes.map((err: MongooseError) => <IErrorCode>{ code: err.message });
    } else {
        console.log('[ExpressJS] errorHandler', error.name, error);
    }

    return res.status(response.status).json(response);
}

export const bearerTokenHandler = async (req: Request, res: Response, next: NextFunction) => {
    var token = req.headers['authorization'] as string;

    try {
        if (!!token && token.startsWith('Bearer '))
            token = token.slice(7, token.length);

        if (!token)
            return next(new HttpException(401, APIErrorType.SESSION_INVALID_TOKEN));

        const decoded = await SessionModel.decode(token);
        if (!decoded)
            return next(new HttpException(401, APIErrorType.SESSION_INVALID_TOKEN));
        res.locals.decoded = decoded;
        return next();
    } catch(err) {
        if ((err as Error).message == "jwt expired")
            return next(new HttpException(401, APIErrorType.SESSION_TOKEN_EXPIRED));
        return next(new HttpException(401, APIErrorType.SESSION_INVALID_TOKEN));
    }
}

export function authorizeQueryParams(authorizedParametersObject: { [key: string]: boolean } = {}) {
    return function (req: Request, res: Response, next: NextFunction) {
        const { query } = req;
        if (query) {
            const errors = [];

            for (const key in query) {
                if (!authorizedParametersObject[key]) {
                    errors.push(
                        `${key} is not a valid parameter, please check api documentation`
                    );
                }
            }

            if (errors.length) {
                return next(new HttpException(400, APIErrorType.API_BAD_REQUEST, errors.join(", ")));
            }
        }
        return next();
    };
}

export function authorizeBodyParams(authorizedParametersObject: { [key: string]: boolean } = {}) {
    return function (req: Request, res: Response, next: NextFunction) {
        const { body } = req;
        if (body) {
            const errors = [];

            for (const key in body) {
                if (!authorizedParametersObject[key]) {
                    errors.push(
                        `${key} is not a valid parameter, please check api documentation`
                    );
                }
            }

            if (errors.length) {
                return next(new HttpException(400, APIErrorType.API_BAD_REQUEST, errors.join(", ")));
            }
        }

        return next();
    };
}

export function validateBodyParams(parametersValidationMapping: {
    [key: string]: ValidatorFunction
}) {
    return function (req: Request, res: Response, next: NextFunction) {
        const { body } = req;
        if (body) {
            const errors = [];
            for (const key in body) {
                if (parametersValidationMapping.hasOwnProperty(key)) {
                    const { errors: parameterErrors, valid: parameterIsValid } =
                        parametersValidationMapping[key](key, body[key]);
                    if (!parameterIsValid) {
                        errors.push(`${key}: ${parameterErrors.join(", ")}`);
                    }
                }
            }
            if (errors.length) {
                return next(new HttpException(400, APIErrorType.API_BAD_REQUEST, errors.join(", ")));
            }
            return next();
        }
        return next();
    };
}

export function requireBodyParams(requiredParametersObject: { [key: string]: boolean } = {}) {
    return function (req: Request, res: Response, next: NextFunction) {
        const { body } = req;
        if (body) {
            const missingKeys = [];
            for (const key in requiredParametersObject) {
                if (!body.hasOwnProperty(key)) {
                    missingKeys.push(key);
                }
            }
            if (missingKeys.length) {
                return next(new HttpException(400, APIErrorType.API_BAD_REQUEST, `Missing ${missingKeys.join(", ")} among required parameters`));
            }
            return next();
        } else {
            return next(new HttpException(400, APIErrorType.API_BAD_REQUEST, `Missing ${Object.keys(requiredParametersObject).join(
                ", "
            )} among required parameters`))
        }
        return next();
    };
}