import { model, Schema, Model, HydratedDocument, ObjectId } from "mongoose";
import { transactionStatus } from './transaction-status';
import { createVerify } from 'node:crypto';
import { Account } from "./account.model";
import { readFile, readFileSync } from "node:fs";
import { join } from 'node:path';

const { Number, ObjectId } = Schema.Types

export interface ITransaction {
    from: ObjectId,
    to: ObjectId,
    transactionStatus: number,
    amount: number,
    signature: string
}

export interface ITransactionMethods {
    verify: () => Promise<boolean>
    verifyTx: (data: string, signature: string, publicKey:string) => boolean
}

export interface TransactionModel extends Model<ITransaction, {}, ITransactionMethods> {
    register: (data: {
        from: string,
        to: string,
        amount: number,
        signature: string
    }) => Promise<HydratedDocument<ITransaction, {}, ITransactionMethods>>
}

const transactionSchema = new Schema<ITransaction, TransactionModel, ITransactionMethods>({
    from: {
        type: ObjectId,
        ref: "Account",
        required: true,
    },
    to: {
        type: ObjectId,
        ref: "Account",
        required: true,
    },
    signature: {
        type: String,
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

transactionSchema.method('verify', async function () {
    const populatedTransaction = await this.populate({ path: 'from to' })
    const { from, to, amount, signature } = populatedTransaction
    const data = JSON.stringify({
        from: from.id,
        to: to.id,
        amount
    })
    const check = this.verifyTx(data, signature, from.key)
    return check;
})

transactionSchema.method('verifyTx', function (data: string, signature: string, publicKey:string) {
    const bufferedData = Buffer.from(data);
    const verify = createVerify('SHA256');
    verify.write(bufferedData);
    verify.end();
    const check = verify.verify(publicKey, signature, 'base64');
    console.log(check)
    return check
})

transactionSchema.static('register', async function (data: {
    from: '',
    to: '',
    signature: '',
    amount: 0
}) {

    const errors = [];
    const { from, to, signature, amount } = data;

    const fromAccount = await Account.findById(from);
    const toAccount = await Account.findById(to);

    if (!fromAccount) {
        errors.push(`sending account does not exists using id ${from}`)
    }

    if (!toAccount) {
        errors.push(`recipient account does not exists using id ${to}`)
    }

    if (errors.length) {
        throw new Error(errors.join(`Invalid accounts specified, reasons: ${errors.join(',')}`))
    }

    const newTransaction = new this({
        from,
        to,
        amount,
        signature
    });

    const registeredTransaction = await newTransaction.save();

    const checkSignature = await registeredTransaction.verify();

    if (!checkSignature) {
        registeredTransaction.transactionStatus = transactionStatus.INVALID_SIGNATURE_ERROR
        return await registeredTransaction.save()
    }

    const checkBalance = fromAccount.balance - amount >= 0

    if (!checkBalance) {
        registeredTransaction.transactionStatus = transactionStatus.INSUFFICIENT_BALANCE_ERROR
        return await registeredTransaction.save()
    }

    fromAccount.balance = fromAccount.balance - registeredTransaction.amount;
    toAccount.balance = toAccount.balance + registeredTransaction.amount

    await fromAccount.save();
    await toAccount.save();

    registeredTransaction.transactionStatus = transactionStatus.APPROVED
    return await registeredTransaction.save()
})

export const Transaction = model<ITransaction, TransactionModel>('Transaction', transactionSchema)