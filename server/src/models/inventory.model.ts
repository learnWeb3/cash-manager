import { Schema, model, HydratedDocument } from 'mongoose';
import { Model } from 'mongoose';

const { Types: { String, ObjectId, Number, Boolean } } = Schema

interface IInventory {

}

export interface InventoryMethods {

}

export interface InventoryModel extends Model<IInventory, {}, InventoryMethods> {

}

export type InventoryDocument = HydratedDocument<IInventory, {}, InventoryMethods>

const InventorySchema = new Schema<IInventory, InventoryModel, InventoryMethods>({

}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

export const Inventory = model<IInventory, InventoryModel>('Inventory', InventorySchema);