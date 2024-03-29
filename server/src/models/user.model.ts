import { Schema, model } from "mongoose";
import { APIErrorType } from "../services/errors.service";
import idValidator from "mongoose-id-validator";
import bcrypt from "bcrypt";
import { IUserDocument, IUserModel } from "../types/IUser";

const userSchema = new Schema<IUserDocument>(
  {
    name: {
      first: {
        type: String,
        required: APIErrorType.USER_INVALID_FIRSTNAME,
        trim: true,
        lowercase: true,
        minLength: [3, APIErrorType.USER_INVALID_FIRSTNAME],
        maxLength: [15, APIErrorType.USER_INVALID_FIRSTNAME],
        match: [/^[a-zA-Z]+$/, APIErrorType.USER_INVALID_FIRSTNAME],
      },
      last: {
        type: String,
        required: APIErrorType.USER_INVALID_LASTNAME,
        trim: true,
        lowercase: true,
        minLength: [3, APIErrorType.USER_INVALID_LASTNAME],
        maxLength: [15, APIErrorType.USER_INVALID_LASTNAME],
        match: [/^[a-zA-Z]+$/, APIErrorType.USER_INVALID_LASTNAME],
      },
    },
    role: {
      type: String,
      enum: ["COMPANY_ADMIN", "ADMIN", "EMPLOYEE"],
      default: "COMPANY_ADMIN",
    },
    email: {
      address: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: APIErrorType.USER_INVALID_EMAIL_ADRESSE,
      },
      activate: {
        type: Boolean,
        default: false,
      },
    },
    password: {
      type: String,
      minLength: [8, APIErrorType.USER_INVALID_PASSWORD],
      required: [true, APIErrorType.USER_INVALID_PASSWORD],
    },
    address: {
      type: String,
      require: false,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
      match: [/^[0-9]+$/, APIErrorType.USER_INVALID_PHONE_SYNTAX],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

userSchema.plugin(idValidator);

userSchema.statics.createUser = async function (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  const userModel = new User({
    name: {
      first: firstName,
      last: lastName,
    },
    email: {
      address: email,
    },
    password: password,
  });
  userModel.hashPassword();
  return await userModel.save();
};

userSchema.statics.ammendOne = async function (
  id: string,
  data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    currentPassword: string;
  }
) {
  const user = await User.findById(id);
  if (!user) {
    throw new Error(`User does not exists using id ${id}`);
  }

  const check = user.comparePassword(data.currentPassword);

  if (!check) {
    throw new Error("invalid user credentials");
  }

  if (data.email) {
    Object.assign(user, {
      ...user.email,
      address: data.email,
    });
  }
  if (data.firstName) {
    Object.assign(user, {
      name: {
        ...user.name,
        first: data.firstName,
      },
    });
  }
  if (data.lastName) {
    Object.assign(user, {
      name: {
        ...user.name,
        last: data.lastName,
      },
    });
  }
  if (data.password) {
    Object.assign(user, {
      password: data.password,
    });
  }

  user.hashPassword();

  return await user.save();
};

userSchema.methods.fullName = function () {
  return this.name.first + " " + this.name.last;
};

userSchema.methods.hashPassword = function () {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
};

userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

const User = model<IUserDocument, IUserModel>("User", userSchema);

export default User;
