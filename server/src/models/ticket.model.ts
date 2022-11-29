import { Schema, model, HydratedDocument } from 'mongoose';
import { TicketStatus } from './ticket-status.model';
import { Model } from 'mongoose';

const { Types: { String, ObjectId, Number, Boolean } } = Schema

interface ITicket {
  user: typeof ObjectId;
  status: TicketStatus
}

export interface TicketMethods {

}

export interface TicketModel extends Model<ITicket, {}, TicketMethods> {

}

export type TicketDocument = HydratedDocument<ITicket, {}, TicketMethods>


const TicketSchema = new Schema<ITicket, TicketModel, TicketMethods>({
  user: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  status: {
    type: String,
    required: true,
    default: TicketStatus.PENDING
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

export const Ticket = model<ITicket, TicketModel>('Ticket', TicketSchema);