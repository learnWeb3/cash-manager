import { Model, model, Schema } from "mongoose";
import { accountStatus } from './account-status';


export interface IAccount {

}

export interface IAccountMedthods {

}

export interface AccountModel extends Model<IAccount, {}, IAccountMedthods> {

}

const accountSchema = new Schema<IAccount, AccountModel, IAccountMedthods>({
    status: {
        type: Number,
        default: accountStatus.UNVERIFIED
    },
    balance: {
        type: Number,
        default: 0
    }
}, {
    toJSON: { virtuals: true },
    toObject: { getters: true, virtuals: true },
    timestamps: true,
})



export const Account = model<IAccount, AccountModel>('Account', accountSchema)