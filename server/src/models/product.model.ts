import { Schema, model, HydratedDocument } from 'mongoose';
import { ProductUnit } from './ProductUnit';
import { Model } from 'mongoose';
import { ProductPrice, ProductPriceDocument } from './product-price.model';
import { ProductCategory } from './product-category.model';
import { ClosingInventoryProduct } from './closing-product-inventory';
import { InventoryProduct, InventoryProductDocument } from './inventory-product.model';
import { TicketProduct, TicketProductDocument } from './ticket-products.model';

const { Types: { String, ObjectId, Number, Boolean } } = Schema

interface IProduct {
  unit: ProductUnit
  category: typeof ObjectId
  label: string
  deleted: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProductVirtals {
  prices: ProductPriceDocument[],
  currentPrice: ProductPriceDocument
  currentStock: number
}

export interface ProductMethods {
  getCurrentStock(): Promise<ProductDocument>
}

export interface ProductModel extends Model<IProduct, {}, ProductMethods, ProductVirtals> {
  register(data: {
    unit: string,
    label: string,
    category: string,
  }): Promise<ProductDocument>
  ammendOne(id: string, data: {
    unit: string,
    label: string,
    category: string,
  }): Promise<ProductDocument>
  ammendOnePrice(id: string, price: number): Promise<ProductDocument>
  findOneWithCurrentPrice(filters: { [key: string]: any }): Promise<ProductDocument>,
  findOneWithCurrentPriceAndStock(filters: { [key: string]: any }): Promise<ProductDocument>,
  removeOne(id: string): Promise<ProductDocument>,
}

export type ProductDocument = HydratedDocument<IProduct, ProductMethods, ProductVirtals>

const ProductSchema = new Schema<IProduct, ProductModel, ProductMethods, {}, ProductVirtals>({
  unit: {
    type: String,
    required: true,
    default: ProductUnit.U
  },
  category: {
    required: true,
    type: ObjectId,
    ref: 'ProductCategory'
  },
  label: {
    type: String,
    required: true,
    unique: true
  },
  deleted: {
    type: Boolean,
    default: false,
    required: true
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

ProductSchema.virtual('prices', {
  ref: 'ProductPrice',
  localField: '_id',
  foreignField: 'product'
})

ProductSchema.virtual('currentPrice', {
  ref: 'ProductPrice',
  localField: '_id',
  foreignField: 'product',
  justOne: true,
  match: { sort: { createdAt: -1 }, limit: 1, },

})

ProductSchema.virtual('currentStock')

ProductSchema.method('getCurrentStock', async function () {
  const closingInventoryProduct = await ClosingInventoryProduct
    .findOne({ product: this.id, sort: { createdAt: -1 }, limit: 1 })
  const productInventories: InventoryProductDocument[] = [];
  const productTickets: TicketProductDocument[] = [];
  if (closingInventoryProduct) {
    // IN
    // get all the inventories products matching product id and createdAt field > closingInventoryProduct date
    productInventories.push(...await InventoryProduct.find({
      product: this.id,
      createdAt: {
        $gt: closingInventoryProduct.createdAt
      }
    }))
    // OUT
    // get all the tickets products matching product id and createdAt field > closingInventoryProduct date
    productTickets.push(...await TicketProduct.find({
      product: this.id,
      createdAt: {
        $gt: closingInventoryProduct.createdAt
      }
    }))
  } else {
    // IN
    // get all the inventories products matching product id
    productInventories.push(...await InventoryProduct.find({
      product: this.id
    }))
    // get all the tickets products matching product id 
    productTickets.push(...await TicketProduct.find({
      product: this.id
    }))
  }
  // IN
  // sum the quantity
  const productInventoriesSum = productInventories.reduce((sum, productInventory) => sum + (productInventory.quantity as unknown as number), 0)
  // OUT
  // sum the quantity
  const productTicketSum = productTickets.reduce((sum, productTicket) => sum + (productTicket.quantity as unknown as number), 0)

  this.currentStock = productInventoriesSum - productTicketSum;

  return this
});



ProductSchema.static('findOneWithCurrentPrice', async function (filters) {
  return await this.findOne(filters).populate({
    path: 'currentPrice'
  })
})

ProductSchema.static('findOneWithCurrentPriceAndStock', async function (filters) {
  return await this.findOne(filters).populate({
    path: 'currentPrice'
  })
    .then(async (product) => await product.getCurrentStock())
})

ProductSchema.static('register', async function (data: {
  unit: string,
  label: string,
  category: string,
}) {
  const errors = [];
  const productCategory = await ProductCategory.exists({
    _id: data.category
  })
  if (!productCategory) {
    errors.push(`Product category with id ${data.category} does not exists`)
  }
  if (errors.length) {
    throw new Error(errors.join(', '))
  }
  const newProduct = new this(data);
  const { id } = await newProduct.save();
  return await this.findOneWithCurrentPriceAndStock({
    _id: id,
    deleted: false
  })
})

ProductSchema.static('ammendOne', async function (id: string, data: {
  unit?: string,
  label?: string,
  category?: string,
}) {
  const errors = [];
  const product = await this.findOne({
    _id: id,
    deleted: false
  })
  if (!product) {
    errors.push(`Product with id ${id} does not exists`)
  }
  if (data.category) {
    const productCategory = await ProductCategory.exists({
      _id: data.category
    })
    if (!productCategory) {
      errors.push(`Product category with id ${data.category} does not exists`)
    }
  }
  if (errors.length) {
    throw new Error(errors.join(', '))
  }
  Object.assign(product, data)
  await product.save();
  return await this.findOneWithCurrentPriceAndStock({
    _id: id,
    deleted: false
  })
})

ProductSchema.static('ammendOnePrice', async function (id: string, price: number) {
  const errors = [];
  const product = await this.findOne({
    _id: id,
    deleted: false
  })
  if (!product) {
    errors.push(`Product with id ${id} does not exists`)
  }
  if (errors.length) {
    throw new Error(errors.join(', '))
  }
  const newProductPrice = new ProductPrice({
    product: product.id,
    price
  })

  await newProductPrice.save();
  return await this.findOneWithCurrentPriceAndStock({
    _id: id,
    deleted: false
  })
})

ProductSchema.static('removeOne', async function (id: string) {
  const errors = [];
  const product = await this.findOne({
    _id: id,
    deleted: false
  })
  if (!product) {
    errors.push(`Product with id ${id} does not exists`)
  }
  if (errors.length) {
    throw new Error(errors.join(', '))
  }
  Object.assign(product, {
    deleted: true
  })
  await product.save();
  return await this.findOneWithCurrentPriceAndStock({
    _id: id,
    deleted: true
  })
})


export const Product = model<IProduct, ProductModel>('Product', ProductSchema);
