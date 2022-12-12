import { Schema, model, HydratedDocument } from 'mongoose';
import { TicketStatus } from './ticket-status.model';
import { Model } from 'mongoose';
import { TicketProduct, TicketProductDocument } from './ticket-products.model';
import { Product } from './product.model';
import User from './user.model';
import { ProductPrice } from './product-price.model';
import { ObjectId } from 'mongoose';
import { ObjectID } from 'bson';

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
  getAnalytics(periodicity: {
    start: number,
    end: number
  }): Promise<any>
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

TicketSchema.static('getAnalytics', async function (periodicity: {
  start: number,
  end: number
}) {

  const filterQueryPart = {
    $match: {
      createdAt: {
        $gte: new Date(periodicity.start * 1000),
        $lt: new Date(periodicity.end * 1000)
      }
    }
  }
  // total CA (sum tickets value) 

  const totalCA = TicketProduct.aggregate([
    // filterQueryPart,
    { $project: { product: { $toObjectId: "$product" }, createdAt: 1 } },
    {
      $lookup: {
        from: ProductPrice.collection.name,
        localField: "product",
        foreignField: "product",
        let: { createdAt: "$createdAt" },
        pipeline: [
          {
            $match: {
              $expr:
                { $lte: ["$createdAt", "$$createdAt"] }
            }
          },
          { $sort: { createdAt: -1 } },
          { $limit: 1 }
        ],
        as: "prices"
      }
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$prices", 0] }, "$$ROOT"] } }
    },
    { $addFields: { label: "sum" } },
    {
      $group:
      {
        _id: "$label",
        sum: { $sum: "$price" }
      }
    },
    { $project: { prices: 0, _id: 0 } },
  ]);

  // await totalCA.exec().then((data) => console.log(JSON.stringify(data, null, 4)))


  // // CA by day

  const daylyCA = TicketProduct.aggregate([
    // filterQueryPart,
    { $project: { product: { $toObjectId: "$product" }, createdAt: 1 } },
    {
      $lookup: {
        from: ProductPrice.collection.name,
        localField: "product",
        foreignField: "product",
        let: { createdAt: "$createdAt" },
        pipeline: [
          {
            $match: {
              $expr:
                { $lte: ["$createdAt", "$$createdAt"] }
            }
          },
          { $sort: { createdAt: -1 } },
          { $limit: 1 }
        ],
        as: "prices"
      }
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$prices", 0] }, "$$ROOT"] } }
    },
    {
      $addFields: {
        date: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d",
            timezone: "UTC"
          }
        }
      }
    },
    {
      $group:
      {
        _id: "$date",
        sum: { $sum: "$price" },
      }
    },
    { $project: { prices: 0, _id: 1 } }
  ]);

  // await daylyCA.exec().then((data) => console.log(JSON.stringify(data, null, 4)))

  // // 10 most bought products

  const mostBoughtProducts = TicketProduct.aggregate([
    // filterQueryPart,
    { $project: { product: { $toObjectId: "$product" }, quantity: 1 } },
    {
      $lookup: {
        from: Product.collection.name,
        localField: "product",
        foreignField: "_id",
        as: "product"
      }
    },
    {
      $group:
      {
        _id: "$product",
        sum: { $sum: "$quantity" },
      }
    },
    {
      $sort: { quantity: -1 }
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$_id", 0] }, "$$ROOT"] } }
    },
    {
      $project: {
        _id: 0
      }
    },
    { $limit: 10 }
  ]);

  // await mostBoughtProducts.exec().then((data) => console.log(JSON.stringify(data, null, 4)))

  // // 10 least bought products

  const leastBoughtProducts = TicketProduct.aggregate([
    // filterQueryPart,
    { $project: { product: { $toObjectId: "$product" }, quantity: 1 } },
    {
      $lookup: {
        from: Product.collection.name,
        localField: "product",
        foreignField: "_id",
        as: "product"
      }
    },
    {
      $group:
      {
        _id: "$product",
        sum: { $sum: "$quantity" },
      }
    },
    {
      $sort: { quantity: 1 }
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$_id", 0] }, "$$ROOT"] } }
    },
    {
      $project: {
        _id: 0
      }
    },
    { $limit: 10 }
  ]);

  await leastBoughtProducts.exec().then((data) => console.log(JSON.stringify(data, null, 4)))

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