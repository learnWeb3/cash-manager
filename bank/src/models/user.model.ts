import { Model, Schema, HydratedDocument, model } from "mongoose";
import { BadRequestError } from "../errors";
import { roles } from './roles';
import { env } from '../services/env.service';
import { ForbiddenError } from '../errors/index';
import bcrypt from 'bcrypt'
import * as nanoid from 'nanoid'
import * as jwt from 'jsonwebtoken';
import { Account } from "./account.model";
import { UserAccount } from './user_account.model';

const { String, Boolean, Number } = Schema.Types


export interface IUser {
    role: number;
    password: string;
    email: string;
    reset_password_token: string;
    firstname: string;
    lastname: string;
    address: string;
    postcode: string;
    country: string;
    deleted: boolean;
}

export interface IUserMethods {
    hashPassword: () => Promise<HydratedDocument<IUser, {}, IUserMethods>>,
    passwordVerify: (textPassword: string) => Promise<boolean>,
    generateResetPasswordToken: () => HydratedDocument<IUser, {}, IUserMethods>,
    encodeJWT: () => string,
    registerAccount: () => Promise<HydratedDocument<IUser, {}, IUserMethods>>,
    listAccounts: () => Promise<HydratedDocument<IUser, {}, IUserMethods>>,
}

export interface UserModel extends Model<IUser, {}, IUserMethods> {
    login: (data: {
        email: string,
        password: string,
    }) => Promise<{
        token: string
    }>
    register: (data: {
        email: string,
        password: string,
        firstname: string,
        lastname: string,
        address: string,
        postcode: string,
        country: string,
        role: number,
    }) => Promise<HydratedDocument<IUser, {}, IUserMethods>>

    updateModel: (user: HydratedDocument<IUser, {}, IUserMethods>, data: {
        email?: string,
        password?: string,
        firstname?: string,
        lastname?: string,
        address?: string,
        postcode?: string,
        country?: string,
        role?: number,
        deleted?: boolean
    }) => Promise<HydratedDocument<IUser, {}, IUserMethods>>
}


const userSchema = new Schema<IUser, UserModel, IUserMethods>({
    role: {
        type: Number,
        required: true,
        default: roles.USER
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    reset_password_token: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        required: false,
        default: false
    }
}, {
    toJSON: { virtuals: true },
    toObject: { getters: true, virtuals: true },
    timestamps: true,
})

userSchema.virtual('accounts', {
    ref: 'UserAccount',
    localField: '_id',
    foreignField: 'user',
});

userSchema.virtual("sentTransactions", {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'from',
})

userSchema.virtual("receivedTransactions", {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'to',
})


userSchema.method('hashPassword', async function () {
    const saltRounds = 10;
    const hash = await new Promise((resolve, reject) =>
        bcrypt.hash(this.password, saltRounds, function (err, hash) {
            if (err) {
                reject();
            } else {
                resolve(hash);
            }
        })
    );
    this.password = hash;
    return this;
});

userSchema.method('passwordVerify', async function (textPassword: string): Promise<boolean> {
    const check: boolean = await new Promise((resolve, reject) =>
        bcrypt.compare(textPassword, this.password, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    );

    if (!check) {
        throw new ForbiddenError("invalid credentials");
    }

    return check;
});

userSchema.method('generateResetPasswordToken', function () {
    const _nanoId = nanoid.nanoid();
    this.reset_password_token = Buffer.from(_nanoId).toString("hex");
    return this;
});

userSchema.method('encodeJWT', function encodeJWT(): string {
    const payload = {
        iss: env.JWT_ISSUER,
        sub: this._id,
    };
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXP * 1000 });
});

userSchema.method('listAccounts', async function () {
    return await this.populate({
        path: 'accounts', populate: {
            path: 'account'
        }
    })
})

userSchema.method('registerAccount', async function () {
    let newAccount = new Account()
    newAccount = await newAccount.save();
    const newUserAccount = new UserAccount({
        user: this.id,
        account: newAccount.id
    });
    await newUserAccount.save()
    return await this.populate({
        path: 'accounts', populate: {
            path: 'account'
        }
    })
})

userSchema.static('updateModel', async function (user: HydratedDocument<IUser, {}, IUserMethods>, data = {
    email: null,
    password: null,
    firstname: null,
    lastname: null,
    address: null,
    postcode: null,
    country: null,
    role: null,
    deleted: null
}): Promise<HydratedDocument<IUser, {}, IUserMethods>> {

    Object.assign(user, data);
    const validate = user.validateSync();
    if (validate !== undefined) {
        throw new BadRequestError(`Validation error: ${validate.message}`);
    }

    if (data.password) {
        user = await user.hashPassword();
    }

    return await user.save()

})

userSchema.static('login', async function (
    data = {
        email: null,
        password: null,
    }
) {
    const { email, password } = data;
    if (email && password) {
        const user = await this.findOne({
            email,
        });

        if (!user) {
            throw new BadRequestError("invalid credentials");
        }

        const check = await user.passwordVerify(password);

        if (!check) {
            throw new BadRequestError("invalid credentials");
        }

        const token = user.encodeJWT();

        return {
            token,
        };
    }
});

userSchema.static('register', async function (
    data = {
        email: null,
        password: null,
        firstname: null,
        lastname: null,
        address: null,
        postcode: null,
        country: null,
        role: null
    }
): Promise<HydratedDocument<IUser, {}, IUserMethods>> {
    const userRole = data.role || roles.USER;

    let newUser = new User({
        ...data,
        role: userRole,
    });

    newUser = newUser.generateResetPasswordToken();


    const validate = newUser.validateSync();
    if (validate !== undefined) {
        throw new BadRequestError(`Validation error: ${validate.message}`);
    }

    newUser = await newUser.hashPassword();

    return await newUser.save()

});

export const User = model<IUser, UserModel>('User', userSchema)