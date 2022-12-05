import { createAction } from "@reduxjs/toolkit";
import { AdminActionTypes, TFetchErrorPayload } from "./ActionTypes";
import withoutPayloadType from "../../utils/PayloadType";
import IUser from "../../types/IUser";
import withPayloadType from "../../utils/PayloadType";

export interface TFetchUserListSuccessPayload {
    success: boolean,
    status: number,
    users: IUser[]
}

export const fetchUserList = createAction(AdminActionTypes.FETCH_USER_LIST, withoutPayloadType());
export const fetchUserListSuccess = createAction(AdminActionTypes.FETCH_USER_LIST_SUCCESS, withPayloadType<TFetchUserListSuccessPayload>());
export const fetchUserListError = createAction(AdminActionTypes.FETCH_USER_LIST_ERROR, withPayloadType<TFetchErrorPayload>());

export const clearAdminError = createAction(AdminActionTypes.CLEAR_ADMIN_ERROR, withoutPayloadType());