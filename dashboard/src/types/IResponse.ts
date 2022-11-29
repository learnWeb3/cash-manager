export interface IErrorResponse {
    errors: [{
        code: string;
        message?: string;
    }],
    status: number;
    success: boolean;
}