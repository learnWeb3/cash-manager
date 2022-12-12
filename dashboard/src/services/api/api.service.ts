import axios from "axios";
import env from "../env.service";
import { IErrorResponse } from "../../types/IResponse";
import { store } from '../../store';
import { fetchRefreshToken } from "../../store/actions/AuthAction";
import Auth from "./auth.service";

export const api = axios.create();

export class ApiError extends Error {
    public payload: any;
    public responseCode?: number;
    public statusCode: number;
    public statusText?: string;
    public responseText?: string;
  
    constructor(
        message: string,
        extras: {
            statusCode: number;
            payload?: any;
            responseCode?: number;
            statusText?: string;
            responseText: string;
        }
    ) {
        super(message);
        this.name = "ApiError";
        this.payload = extras.payload;
        this.responseCode = extras.responseCode;
        this.statusCode = extras.statusCode;
        this.statusText = extras.statusText;
        this.responseText = extras.responseText;
    }
}

api.interceptors.request.use((config) => {
    const { auth } = store.getState();
    if (auth.session?.accessToken)
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${auth.session.accessToken}`
        };
    return {
        ...config,
        headers: config.headers
    };
}, (error) => Promise.reject(error));

api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (err) => { 
        if (!err.response)
            return Promise.reject(
                new ApiError("Error occurred while sending the request, please check your internet settings", {
                    statusCode: 0,
                    responseText: "Error occurred while sending the request, please check your internet settings",
                })
            );

        if (!err.response.data.success) {
            const response: IErrorResponse = err.response.data;

            if (response.errors.map(row => row.code).join(',').includes("SESSION_TOKEN_EXPIRED")) {
                const { auth } = store.getState();
                console.log(auth.session)
                return store.dispatch(fetchRefreshToken({
                    refreshToken: auth.session.refreshToken,
                    onSuccess: () => api.request(err.config),
                    onError: () => Auth.logOut()
                }));
            }

            return Promise.reject(
                new ApiError(response.errors.map(err => err.code).join(', '), {
                    statusCode: response.status,
                    responseText: err.response.data.responseText
                })
            );
        }

        return Promise.reject(
            new ApiError("Oops, something went wrong! We are not quite sure what it is", {
                statusCode: err.response.status,
                responseText: "Oops, something went wrong! We are not quite sure what it is",
            })
        );
    }
);

const Api = {
    post<T, R>(path: string, body: T) {
        return api.post<R>(`${env.API_URL}${path}`, body);
    },

    put<T, R>(path: string, body: T) {
        return api.put<R>(`${env.API_URL}${path}`, body);
    },

    patch<T, R>(path: string, body: T) {
        return api.patch<R>(`${env.API_URL}${path}`, body);
    },

    get<R>(path: string) {
        console.log(`${env.API_URL + path}`)
        return api.get<R>(`${env.API_URL}${path}`);
    },

    delete<R>(path: string) {
        return api.delete<R>(`${env.API_URL}${path}`);
    }
};

export default Api;