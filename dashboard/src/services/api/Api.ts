import axios, {AxiosResponse} from "axios";
import Auth from "./AuthService";
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
  
export interface ApiResponse<T> {
    payload: T;
    responseCode: number;
    responseText: string;
}

api.interceptors.request.use(
    (config) => {
        return {
            ...config,
            headers: {
                ...config.headers,
            }
        };
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (err) => {
        if (!err.response)
            return Promise.reject(
                new ApiError("Error occurred while sending the request, please check your internet settings", {
                    statusCode: 0,
                    responseText: "Error occurred while sending the request, please check your internet settings",
                })
            );
        
        if (err.response.status === 401) {
            Auth.logOut({});
            return Promise.reject(
                new ApiError("User session has expired!", {
                    statusCode: err.response.status,
                    responseText: err.response.data.responseText
                })
            );
        }

        if (err.response.status === 400)
            return Promise.reject(
                new ApiError(err.response.data.message, {
                    statusCode: err.response.status,
                    responseText: err.response.data.message,
                })
            );

        if (err.response.status === 403)
            return Promise.reject(
                new ApiError("You do not have permission to perform this operation", {
                statusCode: err.response.status,
                responseText: "You do not have permission to perform this operation",
                })
            );
    
        if (err.response?.data?.responseText)
            return Promise.reject(
                new ApiError(err.response.data.responseText, {
                    statusCode: err.response.status,
                    responseText: err.response.data.responseText,
                    payload: err.response.data.payload,
                    responseCode: err.response.data.responseCode,
                })
            );

        return Promise.reject(
            new ApiError("Oops, something went wrong! We are not quite sure what it is", {
                statusCode: err.response.status,
                responseText: "Oops, something went wrong! We are not quite sure what it is",
            })
        );
    }
);

const Api = {
    Post<T, R>(path: string, body: T) {
        return api.post<R>(`${path}`, body);
    },

    Put<T, R>(path: string, body: T) {
        return api.put<R>(`${path}`, body);
    },

    Patch<T, R>(path: string, body: T) {
        return api.patch<R>(`${path}`, body);
    },

    Get<R>(path: string) {
        return api.get<R>(`${path}`);
    },

    Delete<R>(path: string) {
        return api.delete<R>(`${path}`);
    }
};

export default Api;