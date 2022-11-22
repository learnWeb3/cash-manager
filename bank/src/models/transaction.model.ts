import { model, Schema, Model, HydratedDocument, ObjectId } from "mongoose";
import { transactionStatus } from './transaction-status';

const { Number, ObjectId } = Schema.Types

export interface ITransaction {
    from: ObjectId,
    to: ObjectId,
    transactionStatus: number,
    amount: number
}

export interface ITransactionMethods {

}

export interface TransactionModel extends Model<ITransaction, {}, ITransactionMethods> {

}

const transactionScheam = new Schema<ITransaction, TransactionModel, ITransactionMethods>({
    from: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    to: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    transactionStatus: {
        type: Number,
        default: transactionStatus.PENDING,
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
        required: true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { getters: true, virtuals: true },
    timestamps: true,
})

export const Transaction = model<ITransaction, TransactionModel>('Transaction', transactionScheam)