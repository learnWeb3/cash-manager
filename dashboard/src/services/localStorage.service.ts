export const LocalKey = "redux";

const LocalStorage = {
	load() {
        try {
            const serialized: any = localStorage.getItem(LocalKey);
            return !serialized ? undefined : JSON.parse(serialized);
        } catch (error) {
            console.warn('[LocalStorage] load:', (error as Error).message);
            return undefined;
        }
	},

	save(state: any) {
        try {
            const serialized: string = JSON.stringify(state);
            localStorage.setItem(LocalKey, serialized);
        } catch (error) {
            console.warn('[LocalStorage] save:',  (error as Error).message);
        }
	},

	remove(key: string) {
        const serialized: any = localStorage.getItem(LocalKey);
        const deserialized: any = !serialized ? null : JSON.parse(serialized);
        delete deserialized[`${key}`];
		localStorage.remove(LocalKey);
        localStorage.setItem(LocalKey, JSON.stringify(deserialized));

	},

	clear() {
		return localStorage.clear();
	},
};

export default LocalStorage;