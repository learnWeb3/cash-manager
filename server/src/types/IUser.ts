import { Document } from "mongodb";
import { Model, ObjectId } from "mongoose";

export interface IUser extends Document {
    name: {
		first: String;
		last: String;
	}
    email: {
		address: String;
		activate: Boolean;
	}
	password: String;
}

export interface IUserDocument extends IUser, Document {
	fullName(): string;
	hashPassword(): void;
	comparePassword(password: string): boolean;
	deleteUser(current_password: string);
}
  
export interface IUserModel extends Model<IUserDocument> {
	createUser(firstName: string, lastName: string, email: string, password: string): Promise<IUserDocument>;
	getById(id: string | ObjectId): Promise<IUserDocument>;
}