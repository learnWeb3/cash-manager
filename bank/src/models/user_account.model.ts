import { Model, model, Schema } from "mongoose";

const { Types: { ObjectId } } = Schema


export interface IUserAccount {
    user: Schema.Types.ObjectId,
    account: Schema.Types.ObjectId,
}

export interface UserAccountModel extends Model<IUserAccount, {}> {

}

const userAcountSchema = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    account: {
        type: ObjectId,
        required: true,
        ref: 'Account'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { getters: true, virtuals: true },
    timestamps: true,
})

export const UserAccount = model<IUserAccount, UserAccountModel>('UserAccount', userAcountSchema)