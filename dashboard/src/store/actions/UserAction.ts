import { createAction } from "@reduxjs/toolkit";
import { UserActionTypes, TFetchErrorPayload } from "./ActionTypes";
import withoutPayloadType from "../../utils/PayloadType";
import IUser from "../../types/IUser";
import withPayloadType from "../../utils/PayloadType";

export const clearUserError = createAction(
    UserActionTypes.CLEAR_USER_ERROR, withoutPayloadType()
);

export interface TFetchSelfDataSuccessPayload {
    success: boolean,
    status: number,
    user: IUser
}

export const fetchSelfData = createAction(UserActionTypes.FETCH_SELF_DATA, withoutPayloadType());
export const fetchSelfDataSuccess = createAction(UserActionTypes.FETCH_SELF_DATA_SUCCESS, withPayloadType<TFetchSelfDataSuccessPayload>());
export const fetchSelfDataError = createAction(UserActionTypes.FETCH_SELF_DATA_ERROR, withPayloadType<TFetchErrorPayload>());
