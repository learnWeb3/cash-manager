export default interface ISession {
    sessionId: string;
    accessToken: string | null;
    refreshToken: string;
    error: boolean;
    message?: string;
};