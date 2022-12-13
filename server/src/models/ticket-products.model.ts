import { Schema, model, HydratedDocument } from 'mongoose';
import { Model } from 'mongoose';

const { Types: { String, ObjectId, Number, Boolean } } = Schema

interface ITicketProduct {
  product: typeof ObjectId;
  ticket: typeof ObjectId;
  quantity: Number,
  createdAt: Date
  updatedAt: Date
}

export interface TicketProductMethods {

}

export interface TicketProductModel extends Model<ITicketProduct, {}, TicketProductMethods> {

}

export type TicketProductDocument = HydratedDocument<ITicketProduct, {}, TicketProductMethods>

const TicketProductSchema = new Schema<ITicketProduct, TicketProductModel, TicketProductModel>({
  product: {
    type: ObjectId,
    required: true,
    ref: 'Product'
  },
  ticket: {
    type: ObjectId,
    required: true,
    ref: 'Ticket'
  },
  quantity: {
    type: Number,
    required: true
  },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

export const TicketProduct = model<ITicketProduct, TicketProductModel>('TicketProduct', TicketProductSchema);