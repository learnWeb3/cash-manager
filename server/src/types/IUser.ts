import { Document } from "mongodb";
import { Model } from "mongoose";

export interface IUser extends Document {
    name: {
		first: String;
		last: String;
	}
	role: string;
    email: {
		address: String;
		activate: Boolean;
	};
	password: String;
	adress: String;
	phone: String;
}

export interface IUserDocument extends IUser, Document {
	fullName(): string;
	hashPassword(): void;
	comparePassword(password: string): boolean;
}
  
export interface IUserModel extends Model<IUserDocument> {
	createUser(firstName: string, lastName: string, email: string, password: string): Promise<IUserDocument>;
}