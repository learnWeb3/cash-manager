// import { Model, Schema, Types, model, Document } from 'mongoose';
// import { APIErrorType } from '../services/errors.service';
// import idValidator from 'mongoose-id-validator';
// import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

// const SESSION_SECRET: string = process.env.SESSION_SECRET || "";

// interface IJWTToken {
//     value: String;
//     user: Schema.Types.ObjectId;
// 	ip: String
// }

// interface IJWTTokenDocument extends IJWTToken, Document {
// 	sign(time: string): string;
// }
  
// interface JWTTokenModel extends Model<IJWTTokenDocument> {
// 	createToken(user: IJWTToken): Promise<IJWTTokenDocument>;
// 	decode(token: string): Promise<JwtPayload>;
// };

// const jwtSchema = new Schema<IJWTTokenDocument>({
// 	value: {
// 		type: String,
// 		required: [true, APIErrorType.JTWTOKEN_INVALID_VALUE]
// 	},
// 	user: {
// 		type: Schema.Types.ObjectId,
// 		ref: 'User',
// 		required: APIErrorType.JTWTOKEN_INVALID_USER
// 	},
// 	ip: {
// 		type: String,
// 		minLength: [16, APIErrorType.JTWTOKEN_INVALID_IP],
// 		maxLength: [7, APIErrorType.JTWTOKEN_INVALID_IP],
// 		match: [/^[1-9.]+$/, APIErrorType.JTWTOKEN_INVALID_IP],
// 		required: [true, APIErrorType.JTWTOKEN_INVALID_IP]
// 	}
// }, {
// 	collection: 'tokens',
// 	timestamps: true 
// });

// jwtSchema.plugin(idValidator);

// jwtSchema.statics.createToken = async(userId: Types.ObjectId, userIp: string) => {
// 	const token = new JWTToken({
// 		value: '',
// 		user: userId,
// 		ip: userIp
// 	});
// 	token.value = token.sign('2h');
// 	return await token.save();
// };

// jwtSchema.statics.decode = async function(token: string)  {
// 	const decoded = await new Promise((resolve, reject) =>
// 		jsonwebtoken.verify(token, SESSION_SECRET, (err, decoded) => err ? reject(err) : resolve(decoded)));
// 	return decoded;
// }

// jwtSchema.methods.sign = function(time: string) {
// 	return jsonwebtoken.sign(this.user._doc, SESSION_SECRET, { expiresIn: time });
// };
  
// const JWTToken = model<IJWTTokenDocument, JWTTokenModel>('JWTToken', jwtSchema);
// export default JWTToken;