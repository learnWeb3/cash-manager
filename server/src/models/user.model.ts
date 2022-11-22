import { Schema, model, ObjectId } from 'mongoose';
import idValidator from 'mongoose-id-validator';
import bcrypt from 'bcrypt';

import { IUserDocument, IUserModel } from '../types/IUser';

const userSchema = new Schema<IUserDocument>({
	firstname: {
		type: String,
		required: [true, "USER_INVALID_FIRSTNAME"],
		trim: true,
		lowercase: true,
		minLength: [3, "USER_INVALID_FIRSTNAME"],
		maxLength: [15, "USER_INVALID_FIRSTNAME"],
		match: [/^[a-zA-Z]+$/, "USER_INVALID_FIRSTNAME"]
	},
	lastname: {
		type: String,
		required: [true, "USER_INVALID_LASTNAME"],
		trim: true,
		lowercase: true,
		minLength: [3, "USER_INVALID_LASTNAME"],
		maxLength: [15, "USER_INVALID_LASTNAME"],
		match: [/^[a-zA-Z]+$/, "USER_INVALID_LASTNAME"]
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: [true, "USER_INVALID_ADRESSE"]
	},
	password: {
		type: String,
		minLength: [8, "USER_INVALID_PASSWORD"],
		required: [true, "USER_INVALID_PASSWORD"]
	},
	reset_password_token: {
		type: String,
		default: null
	},
	role_id: {
		type: Schema.Types.Number,
		default: 0
	}
});

userSchema.plugin(idValidator);

userSchema.statics.createUser = async function(firstName: string, lastName: string, email: string, password: string) {
	const userModel = new User({
		firstname: firstName,
		lastname: lastName,
		email: email,
		password: password
	});
	userModel.hashPassword();
	return await userModel.save();
};

userSchema.statics.getById = async function(id: string | ObjectId) {
	const user = await User.findById(id)
								.select({__v: 0, updatedAt: 0, password: 0})
								.lean();
	if (!user)
		throw new Error(`User ${id} not found in database..`)
	return user;
} 

userSchema.methods.deleteUser = async function(current_password: string) {
	if (!this.comparePassword(current_password))
		throw new Error('User password doesn\'t match')	
	await User.deleteOne({_id: this._id});
};

userSchema.methods.fullName = function() {
	return this.name.first + ' ' + this.name.last;
};

userSchema.methods.hashPassword = function() {
	try {
		const salt = bcrypt.genSaltSync(10);	
		this.password = bcrypt.hashSync(this.password, salt);
	} catch(err) {
		console.log('hashPassword', err);
	}
};

userSchema.methods.comparePassword = function(password: string) {
	return bcrypt.compareSync(password, this.password);
};

const User = model<IUserDocument, IUserModel>('User', userSchema);

export default User;