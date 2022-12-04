import { Schema, model, HydratedDocument } from 'mongoose';
import { TicketStatus } from './ticket-status.model';
import { Model } from 'mongoose';
import { TicketProduct, TicketProductDocument } from './ticket-products.model';
import { Product } from './product.model';
import User from './user.model';

const { Types: { String, ObjectId, Number, Boolean } } = Schema

interface ITicket {
  user: typeof ObjectId
  status: TicketStatus
  createdAt: Date
  updatedAt: Date
}

export interface TicketMethods {

}

export interface TicketVirtuals {
  products: TicketProductDocument[]
}

export interface TicketModel extends Model<ITicket, {}, TicketMethods> {
  register(data: {
    user: string
    products: { id: string, quantity: number }[]
  }): Promise<TicketDocument>,
  findOneWithUserAndProducts(filters: { [key: string]: any }): Promise<TicketDocument>
  findOneWithUser(filters: { [key: string]: any }): Promise<TicketDocument>,
  findOneWithProducts(filters: { [key: string]: any }): Promise<TicketDocument>,
}

export type TicketDocument = HydratedDocument<ITicket, TicketMethods, TicketVirtuals>


const TicketSchema = new Schema<ITicket, TicketModel, TicketMethods, {}, TicketVirtuals>({
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

TicketSchema.virtual('products', {
  ref: 'TicketProduct',
  localField: '_id',
  foreignField: 'ticket'
})

TicketSchema.static('findOneWithUser', async function (filters) {
  return await this.findOne(filters).populate({
    path: 'user'
  })
})

TicketSchema.static('findOneWithProducts', async function (filters) {
  return await this.findOne(filters).populate({
    path: 'products',
    populate: 'product'
  })
})

TicketSchema.static('findOneWithUserAndProducts', async function (filters) {
  return await this.findOne(filters)
    .populate({
      path: 'user'
    })
    .populate({
      path: 'products',
      populate: 'product'
    })
})

TicketSchema.static('register', async function (data: { user: string, products: { id: string, quantity: number }[] }) {
  const errors = [];
  const userExists = await User.exists({
    _id: data.user
  })
  if (!userExists) {
    errors.push(`User does not exists with id ${data.user}`)
  }
  for (const product of data.products) {
    const productExists = await Product.exists({
      _id: product.id,
      deleted: false
    })
    if (!productExists) {
      errors.push(`Product does not exists with id ${product.id}`)
    }
  }
  if (errors.length) {
    throw new Error(errors.join(', '))
  }

  const newTicket = new this({
    user: data.user
  })

  const { id: newTicketId } = await newTicket.save()

  for (const product of data.products) {
    const newTicketProduct = new TicketProduct({
      ticket: newTicket.id,
      product: product.id,
      quantity: product.quantity
    })
    await newTicketProduct.save();
  }

  return await this.findOneWithUser({
    _id: newTicketId
  }).then(async (ticketWithUser) => {
    const ticketWithProducts = await this.findOneWithProducts({
      _id: newTicketId
    })
    ticketWithProducts.user = ticketWithUser.user;
    return ticketWithProducts
  })
})

export const Ticket = model<ITicket, TicketModel>('Ticket', TicketSchema);