import api from "./api.service";
import Cookie from "../cookie.service";
import { TFetchLoginPayload, TFetchRegisterPayload, TFetchRefreshTokenPayload } from "../../store/actions/AuthAction";

import LocalStorage from "../localStorage.service";

const Auth = {
    getAccessToken() {
        return Cookie.SESSION()?.accessToken || null;
    },

    isAuthenticated(): boolean {
        return this.getAccessToken() ? true : false;
    },

    userLoginService(payload: TFetchLoginPayload) {
        return api.post(`/auth/login`, payload);
    },

    userRegisterService(payload: TFetchRegisterPayload) {
        return api.post(`/auth/register`, payload);
    },

    userRefreshTokenService(payload: TFetchRefreshTokenPayload) {
        return api.post(`/auth/refreshToken`, payload);
    },

    logOut() {
        LocalStorage.clear();
        Cookie.remove("session");
        window.location.reload();
    },
};
export default Auth;
