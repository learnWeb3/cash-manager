import { HydratedDocument, Model, model, Schema } from "mongoose";
import { BadRequestError } from "../errors";
import { accountStatus } from './account-status';


export interface IAccount {
    status: number,
    balance: number,
    key: string
}

export interface IAccountMedthods {

}

export interface AccountModel extends Model<IAccount, {}, IAccountMedthods> {

    updateModel: (user: HydratedDocument<IAccount, {}, IAccountMedthods>, data: {
        balance?: number,
        key?: string,
        status?: number
    }) => Promise<HydratedDocument<IAccount, {}, IAccountMedthods>>
}

const accountSchema = new Schema<IAccount, AccountModel, IAccountMedthods>({
    status: {
        type: Number,
        default: accountStatus.UNVERIFIED
    },
    balance: {
        type: Number,
        default: 0
    },
    key: {
        type: String,
        required: false,
        default: "",
    }
}, {
    toJSON: { virtuals: true },
    toObject: { getters: true, virtuals: true },
    timestamps: true,
})

accountSchema.static('updateModel', async function (account: HydratedDocument<IAccount, {}, IAccountMedthods>, data = {
    status: null,
    key: null,
    balance: null
}): Promise<HydratedDocument<IAccount, {}, IAccountMedthods>> {

    Object.assign(account, data);
    const validate = account.validateSync();
    if (validate !== undefined) {
        throw new BadRequestError(`Validation error: ${validate.message}`);
    }

    return await account.save()

})



export const Account = model<IAccount, AccountModel>('Account', accountSchema)