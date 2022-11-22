import api from "./Api";
import Cookie from "../Cookie";
import { TFetchLoginDetailsPayload } from "../../store/actions/AuthAction";

import environment from "../../utils/Environment";
import LocalStorage from "../LocalStorage";
const { apiURL } = environment;

const Auth = {
    getAccessToken() {
        return Cookie.SESSION()?.accessToken || null;
    },

    isAuthenticated(): boolean {
        return this.getAccessToken() ? true : false;
    },

    userLoginService(payload: TFetchLoginDetailsPayload) {
        return api.Post(`${apiURL}/auth/login`, payload);
    },

    userRegService(payload: TFetchLoginDetailsPayload) {
        return api.Post(`${apiURL}/auth/register`, payload);
    },

    getUserInfoService() {
        return api.Get(`${apiURL}/user`);
    },

    logOut(history: any) {
        LocalStorage.clear();
        Cookie.remove("session");
        // history.push({ pathname: "/" });
        window.location.reload();
    },
};
export default Auth;
