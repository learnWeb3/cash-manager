import { env } from "../services/env.service";
import { BadRequestError, UnauthorizedError } from "../errors";
import { User } from '../models/user.model';

/**
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export function errorHandler(err: any, req: any, res: any, next: any) {
    const errorMessage = err.message;
    const { path } = req;
    if (err?.constructor?.name) {
        const errorType = err.constructor.name;
        switch (errorType) {
            case "ForbiddenError":
                res.status(403);
                res.json({
                    status: "error",
                    statusCode: 403,
                    statusMessage: "Forbidden",
                    message: errorMessage,
                    path,
                });
                return;
            case "UnauthorizedError":
                res.status(401);
                res.json({
                    status: "error",
                    statusCode: 401,
                    statusMessage: "Unauthorized",
                    message: errorMessage,
                    path,
                });
                return;
            case "NotFoundError":
                res.status(400);
                res.json({
                    status: "error",
                    statusCode: 404,
                    statusMessage: "Not found !",
                    message: errorMessage,
                    path,
                });
                return;
            case "BadRequestError":
                res.status(400);
                res.json({
                    status: "error",
                    statusCode: 400,
                    statusMessage: "Bad request",
                    message: errorMessage,
                    path,
                });
                return;
            case "ValidationError":
                res.status(400);
                res.json({
                    status: "error",
                    statusCode: 400,
                    statusMessage: "Bad request",
                    message: errorMessage,
                    path,
                });
                return;
            default:
                res.status(500);
                res.json({
                    status: "error",
                    statusCode: 500,
                    statusMessage: "Internal Server Error",
                    message: errorMessage,
                    path,
                });
                return;
        }
    } else {
        res.status(500);
        res.json({
            status: "error",
            statusCode: 500,
            statusMessage: "Internal Server Error",
            message: errorMessage,
            path,
        });
        return;
    }
}

export function parseJWTToken(
    options = {
        resultProperty: "locals.userId",
    }
) {
    function validateResultPropertyFormat(resultProperty) {
        const properties = resultProperty.match(/[a-zA-z]+/g);
        const dotSeparators = resultProperty.match(/\./g);
        const test = /[a-zA-Z\.]+/.test(resultProperty);
        const testType = typeof resultProperty === "string";
        if (
            !testType ||
            !test ||
            properties.length < dotSeparators.length ||
            properties.length - 1 !== dotSeparators.length
        ) {
            return false;
        }
        return true;
    }
    const properties = options.resultProperty.split(".");
    function setResultProperty(storeObject, properties, value) {
        let temp = null;
        properties.forEach((element, index) => {
            if (!temp) {
                storeObject[element] = {};
                temp = storeObject[element];
            } else {
                if (index < properties.length - 1) {
                    temp[element] = {};
                    temp = temp[element];
                } else {
                    temp[element] = value;
                }
            }
        });
        return storeObject;
    }

    if (!validateResultPropertyFormat(options.resultProperty)) {
        throw new Error(
            `propertyResult format is invalid must be a string following following format property1.property2.propertyN..`
        );
    }

    return function (req, res, next) {
        if (res.locals.token) {
            const { locals } = setResultProperty(
                {},
                properties,
                res.locals.token.sub
            );
            res.locals = {
                ...res.locals,
                ...locals,
            };
        }
        return next();
    };
}

export function roleGuard(options = {
    authorizedRoles: [],
    userLocalsProperty: "userId"
}) {
    const { authorizedRoles, userLocalsProperty } = options
    return function (req, res, next) {
        const tokenSubClaim = res.locals[userLocalsProperty] || null
        if (tokenSubClaim) {
            User.findOne({
                _id: tokenSubClaim
            }).then((userModel) => {
                if (authorizedRoles.includes(userModel.role)) {
                    next();
                } else {
                    throw new UnauthorizedError('You do not have the rights to perform this action please contact your administrator in order to access this ressource')
                }
            }).catch((error) => {
                throw new UnauthorizedError('You do not have the rights to perform this action please contact your administrator in order to access this ressource')
            })
        } else {
            throw new UnauthorizedError('You do not have the rights to perform this action please contact your administrator in order to access this ressource')
        }
    }
}


export function authorizeQueryParams(authorizedParametersObject = {}) {
    return function (req, res, next) {
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
                return next(new BadRequestError(errors.join(", ")));
            }
        }
        return next();
    };
}

export function authorizeBodyParams(authorizedParametersObject = {}) {
    return function (req, res, next) {
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
                return next(new BadRequestError(errors.join(", ")));
            }
        }

        return next();
    };
}

export function validateBodyParams(parametersValidationMapping = {}) {
    return function (req, res, next) {
        const { body } = req;
        if (body) {
            const errors = [];
            for (const key in body) {
                if (parametersValidationMapping.hasOwnProperty(key)) {
                    const { errors: parameterErrors, valid: parameterIsValid } =
                        parametersValidationMapping[key](body[key]);
                    if (!parameterIsValid) {
                        errors.push(`${key}: ${parameterErrors.join(", ")}`);
                    }
                }
            }
            if (errors.length) {
                return next(
                    new BadRequestError(`validations errors: ${errors.join(", ")}`)
                );
            }
            return next();
        }
        return next();
    };
}

export function requireBodyParams(requiredParametersObject = {}) {
    return function (req, res, next) {
        const { body } = req;
        if (body) {
            const missingKeys = [];
            for (const key in requiredParametersObject) {
                if (!body.hasOwnProperty(key)) {
                    missingKeys.push(key);
                }
            }
            if (missingKeys.length) {
                return next(
                    new BadRequestError(
                        `Missing ${missingKeys.join(", ")} among required parameters`
                    )
                );
            }
        } else {
            return next(
                new BadRequestError(
                    `Missing ${Object.keys(requiredParametersObject).join(
                        ", "
                    )} among required parameters`
                )
            );
        }
        return next();
    };
}

export function parseQueryParams(queryParamsParserObj = {}) {
    return function (req, res, next) {
        const missingKeys = [];
        for (const key in queryParamsParserObj) {
            if (req.query[key]) {
                req.query[key] = queryParamsParserObj[key](req.query[key]);
            } else {
                missingKeys.push(key);
            }
        }
        if (missingKeys.length) {
            return next(
                new BadRequestError(
                    `Missing ${missingKeys.join(
                        ", "
                    )} among required query parameters, a parser has been defined thus parameters are required`
                )
            );
        }
        return next();
    };
}

// options for the filter middleware
export const filterOptions = {
    bodyBlackList: ["$", "&&", "$", "$ne", "$eq", "{", "}"],
    urlMessage: "A forbidden expression has been found: ",
    appendFound: true,
    caseSensitive: true,
    dispatchToErrorHandler: true,
    urlBlackList: ["&&", "$", "$ne", "$eq"],
};

// options for express jwt middleware
export const expressJwtOptions = {
    secret: env.JWT_SECRET,
    algorithms: ["HS256"],
    issuer: env.JWT_ISSUER,
    resultProperty: "locals.token",
    getToken: function fromHeaderOrQuerystring(req) {
        if (
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
            return req.headers.authorization.split(" ")[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    },
};

// optitons express cors middleware
export const corsOptions = {
    origin: env.CORS_ALLOWED_ORIGIN,
    optionsSuccessStatus: 200,
};

// options json body parsing middleware
export const jsonBodyParsingOptions = {
    limit: "50mb",
};

// urlEncoded body parsing middleware
export const urlEncodedBodyParsingOptions = { extended: true, limit: "50mb" };
