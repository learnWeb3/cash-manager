import { Schema, Types, model } from 'mongoose';
import idValidator from 'mongoose-id-validator';
import jsonwebtoken, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import crypto from 'crypto';

import { ISession, ISessionDocument, ISessionModel, DecodedToken } from '../types/ISession';
import { APIErrorType } from '../services/errors.service';
import env from '../services/env.service';

const sessionSchema = new Schema<ISessionDocument>({
	refreshToken: {
		type: String,
		required: [true, APIErrorType.SESSION_INVALID_TOKEN]
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, APIErrorType.SESSION_INVALID_TOKEN]
	},
	devices: [{
		userAgent: {
			type: String,
			required: [true, APIErrorType.SESSION_INVALID_USER_AGENT]
		},
		ip: {
			type: String,
			required: [true, APIErrorType.SESSION_INVALID_TOKEN]
		}
	}],
}, {
	collection: 'session',
	timestamps: true 
});

sessionSchema.plugin(idValidator);

sessionSchema.statics.createSession = async(userId: Types.ObjectId, userAgent, userIp: string): Promise<ISession> => {
	const token = new Session({
		refreshToken: crypto.randomBytes(64).toString('hex'),
		user: userId,
		devices: [{
			userAgent: userAgent,
			ip: userIp
		}]
	});
	await token.save();
	return {
		accessToken: await token.sign(),
		refreshToken: token._doc.refreshToken,
		user: token._doc.user._id,
		devices: token._doc.devices
	}
};

sessionSchema.methods.refresh = async function(): Promise<ISession> {
	this.refreshToken = crypto.randomBytes(64).toString('hex');
	await this.save();
	return {
		accessToken: await this.sign(),
		refreshToken: this.refreshToken,
		user: this.user,
		devices: this.devices
	}
};

sessionSchema.statics.decode = async function(token: string): Promise<DecodedToken> {
	return await new Promise((resolve, reject) => 
		jsonwebtoken.verify(token, env.SESSION_SECRET, (err, decoded) => err ? reject(err) : resolve(decoded as DecodedToken))
	);
}

sessionSchema.methods.sign = async function(): Promise<string> {
	await this.populate({path: 'user', select: { _id: 1, role: 1 }});
	return jsonwebtoken.sign({
		session: this._id.toString(),
		_id: this.user._doc._id.toString(),
		role: this.user._doc.role
	}, env.SESSION_SECRET, { expiresIn: env.SESSION_EXPIRE });
};



sessionSchema.methods.newIpAddress = function() {
	// return jsonwebtoken.sign(this.user._doc, env.SESSION_SECRET, { expiresIn: env.SESSION_EXPIRE });
};
  
const Session = model<ISessionDocument, ISessionModel>('Session', sessionSchema);
export default Session;