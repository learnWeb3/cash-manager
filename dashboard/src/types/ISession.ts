export default interface ISession {
    _id: string;
    accessToken: string;
	refreshToken: string;
	user: string;
    devices: [{
        userAgent: string;
        ip: string;
    }]
};