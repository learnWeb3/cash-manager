export default interface IUser {
	_id: string;
    name: {
		first: String;
		last: String;
	}
	role: string;
    email: {
		address: String;
		activate: Boolean;
	};
	adress?: String;
	phone?: String;
}
  