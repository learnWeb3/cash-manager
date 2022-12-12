export interface TFetchErrorPayload {
	message: string;
}

export enum AuthActionTypes {
    CLEAR_AUTH_ERROR = "CLEAR_AUTH_ERROR",
    AUTH_LOGOUT = "AUTH_LOGOUT",

    FETCH_LOGIN = "FETCH_LOGIN",
    FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS",
    FETCH_LOGIN_ERROR = "FETCH_LOGIN_ERROR",

    FETCH_REGISTER = "FETCH_REGISTER",
    FETCH_REGISTER_SUCCESS = "FETCH_REGISTER_SUCCESS",
    FETCH_REGISTER_ERROR = "FETCH_REGISTER_ERROR",

    FETCH_REFRESH_TOKEN = "FETCH_REFRESH_TOKEN",
    FETCH_REFRESH_TOKEN_SUCCESS = "FETCH_REFRESH_TOKEN_SUCCESS",
    FETCH_REFRESH_TOKEN_ERROR = "FETCH_REFRESH_TOKEN_ERROR"
}

export enum UserActionTypes {
    CLEAR_USER_ERROR = "CLEAR_USER_ERROR",

    FETCH_SELF_DATA = "FETCH_SELF_DATA",
    FETCH_SELF_DATA_SUCCESS = "FETCH_SELF_DATA_SUCCESS",
    FETCH_SELF_DATA_ERROR = "FETCH_SELF_DATA_ERROR",
}

export enum AdminActionTypes {
    CLEAR_ADMIN_ERROR = "CLEAR_ADMIN_ERROR",

    FETCH_USER_LIST = "FETCH_USER_LIST",
    FETCH_USER_LIST_SUCCESS = "FETCH_USER_LIST_SUCCESS",
    FETCH_USER_LIST_ERROR = "FETCH_USER_LIST_ERROR",


    FETCH_ONE_USER = "FETCH_ONE_USER",
    FETCH_ONE_USER_SUCCESS = "FETCH_ONE_USER_SUCCESS",
    FETCH_ONE_USER_ERROR = "FETCH_ONE_USER_ERROR"
}