import Cookies from 'js-cookie';
import ISession from '../types/ISession';

const Cookie = {
	get(key: string): string | undefined {
		return Cookies.get(key);
	},

	set(key: string, value: string | boolean | undefined, options?: Object) {
		Cookies.set(key, `${value}`, options);
	},

	remove(key: string, options?: Object) {
		Cookies.remove(key, options);
	},

	SESSION(): ISession | null {
        const session = Cookies.get("session") as string;
		return session ? JSON.parse(session) as ISession : null;
	}
};

export default Cookie;