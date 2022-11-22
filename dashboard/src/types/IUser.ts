export default interface IUser {
	_id: string;
    name: {
		first: string;
		last: string;
    },
	email: string;
	storagesId: Array<string>;
	notifisId: Array<string>;
}
  