import { createAction } from "@reduxjs/toolkit";
import { AuthActionTypes, TFetchErrorPayload } from "./ActionTypes";
import withPayloadType, { withoutPayloadType } from "../../utils/PayloadType";
import ISession from "../../types/ISession";

export interface TFetchLoginPayload {
    email: string;
    password: string;
    onSuccess: () => void;
}

export const fetchLogin = createAction(AuthActionTypes.FETCH_LOGIN, withPayloadType<TFetchLoginPayload>());
export const fetchLoginSuccess = createAction(AuthActionTypes.FETCH_LOGIN_SUCCESS, withPayloadType<ISession>());
export const fetchLoginError = createAction(AuthActionTypes.FETCH_LOGIN_ERROR, withPayloadType<TFetchErrorPayload>());


export interface TFetchRegisterPayload {
    firstName: string,
    lastName: string,
    email: string,
    password: string
    onSuccess: () => void;
}

export const fetchRegister = createAction(AuthActionTypes.FETCH_REGISTER, withPayloadType<TFetchRegisterPayload>());
export const fetchRegisterError = createAction(AuthActionTypes.FETCH_REGISTER_ERROR, withPayloadType<TFetchErrorPayload>());

export interface TFetchRefreshTokenPayload {
    refreshToken: string;
    onSuccess: () => void;
    onError: () => void;
}

export const fetchRefreshToken = createAction(AuthActionTypes.FETCH_REFRESH_TOKEN, withPayloadType<TFetchRefreshTokenPayload>());
export const fetchRefreshTokenSuccess = createAction(AuthActionTypes.FETCH_REFRESH_TOKEN_SUCCESS, withPayloadType<ISession>());
export const fetchRefreshTokenError = createAction(AuthActionTypes.FETCH_REFRESH_TOKEN_ERROR, withPayloadType<TFetchErrorPayload>());


export const logoutAction = createAction(AuthActionTypes.AUTH_LOGOUT);
export const clearAuthError = createAction(AuthActionTypes.CLEAR_AUTH_ERROR, withoutPayloadType());
