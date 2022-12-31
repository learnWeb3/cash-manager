import { Schema, model, HydratedDocument } from "mongoose";
import { ProductUnit } from "./ProductUnit";
import { Model } from "mongoose";
import { ProductPrice, ProductPriceDocument } from "./product-price.model";
import { ProductCategory } from "./product-category.model";
import { ClosingInventoryProduct } from "./closing-product-inventory";
import {
  InventoryProduct,
  InventoryProductDocument,
} from "./inventory-product.model";
import { Media } from "./media.model";
import { ProductMediaDocument, ProductMedia } from "./product-media.model";
import { TicketProduct, TicketProductDocument } from "./ticket-products.model";
import { ObjectID } from "bson";
const {
  Types: { String, ObjectId, Number, Boolean },
} = Schema;

interface IProduct {
  unit: ProductUnit;
  category: typeof ObjectId;
  ref: string;
  label: string;
  description: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVirtuals {
  prices: ProductPriceDocument[];
  currentPrice: ProductPriceDocument;
  currentStock: number;
  medias: ProductMediaDocument[];
}

export interface ProductMethods {
  getCurrentStock(): Promise<ProductDocument>;
}

export interface ProductModel
  extends Model<IProduct, {}, ProductMethods, ProductVirtuals> {
  register(data: {
    unit: string;
    label: string;
    category: string;
    ref: string;
    description: string;
  }): Promise<ProductDocument>;
  ammendOne(
    id: string,
    data: {
      unit?: string;
      label?: string;
      category?: string;
      ref?: string;
      description?: string;
    }
  ): Promise<ProductDocument>;
  ammendOnePrice(id: string, price: number): Promise<ProductDocument>;
  addMedias(id: string, mediasIds: string[]): Promise<ProductDocument>;
  removeMedias(id: string, mediasIds: string[]): Promise<ProductDocument>;
  findAllWithCurrentStockAndPrice(filters: {
    [key: string]: any;
  }): Promise<ProductDocument[]>;
  findOneWithCurrentPrice(filters: {
    [key: string]: any;
  }): Promise<ProductDocument>;
  findOneWithCurrentPriceAndStock(filters: {
    [key: string]: any;
  }): Promise<ProductDocument>;
  removeOne(id: string): Promise<ProductDocument>;
  getAnalytics(periodicity: { start: number; end: number }): Promise<any>;
}

export type ProductDocument = HydratedDocument<
  IProduct,
  ProductMethods,
  ProductVirtuals
>;

const ProductSchema = new Schema<
  IProduct,
  ProductModel,
  ProductMethods,
  {},
  ProductVirtuals
>(
  {
    unit: {
      type: String,
      required: true,
      default: ProductUnit.U,
    },
    category: {
      required: true,
      type: ObjectId,
      ref: "ProductCategory",
    },
    ref: {
      type: String,
      required: true,
      unique: true,
    },
    label: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
      required: true,
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

ProductSchema.virtual("prices", {
  ref: "ProductPrice",
  localField: "_id",
  foreignField: "product",
});

ProductSchema.virtual("medias", {
  ref: "ProductMedia",
  localField: "_id",
  foreignField: "product",
});

ProductSchema.virtual("currentPrice");

ProductSchema.virtual("currentStock");

ProductSchema.method("getCurrentStock", async function () {
  const closingInventoryProduct = await ClosingInventoryProduct.findOne({
    product: this.id,
    sort: { createdAt: -1 },
    limit: 1,
  });
  const productInventories: InventoryProductDocument[] = [];
  const productTickets: TicketProductDocument[] = [];
  if (closingInventoryProduct) {
    // IN
    // get all the inventories products matching product id and createdAt field > closingInventoryProduct date
    productInventories.push(
      ...(await InventoryProduct.find({
        product: this.id,
        createdAt: {
          $gt: closingInventoryProduct.createdAt,
        },
      }))
    );
    // OUT
    // get all the tickets products matching product id and createdAt field > closingInventoryProduct date
    productTickets.push(
      ...(await TicketProduct.find({
        product: this.id,
        createdAt: {
          $gt: closingInventoryProduct.createdAt,
        },
      }))
    );
  } else {
    // IN
    // get all the inventories products matching product id
    productInventories.push(
      ...(await InventoryProduct.find({
        product: this.id,
      }))
    );
    // get all the tickets products matching product id
    productTickets.push(
      ...(await TicketProduct.find({
        product: this.id,
      }))
    );
  }
  // IN
  // sum the quantity
  const productInventoriesSum = productInventories.reduce(
    (sum, productInventory) =>
      sum + (productInventory.quantity as unknown as number),
    0
  );
  // OUT
  // sum the quantity
  const productTicketSum = productTickets.reduce(
    (sum, productTicket) => sum + (productTicket.quantity as unknown as number),
    0
  );

  this.currentStock = productInventoriesSum - productTicketSum;

  return this;
});

ProductSchema.static(
  "addMedias",
  async function (id: string, mediasIds: string[] = []) {
    const errors = [];
    const product = await this.findOne({
      _id: id,
      deleted: false,
    });
    if (!product) {
      errors.push(`Product with id ${id} does not exists`);
    }

    const mediasToBeLinked = [];

    for (const mediaId of mediasIds) {
      const media = await Media.findOne({
        _id: mediaId,
      });

      if (!media) {
        errors.push(`Media with id ${mediaId} does not exists`);
      } else {
        mediasToBeLinked.push(media);
      }
    }

    if (errors.length) {
      throw new Error(errors.join(", "));
    }

    for (const mediaToBeLinked of mediasToBeLinked) {
      const newProductMedia = new ProductMedia({
        media: mediaToBeLinked.id,
        product: product.id,
      });

      await newProductMedia.save();
    }

    return await this.findOneWithCurrentPriceAndStock({
      _id: id,
      deleted: false,
    });
  }
);

ProductSchema.static(
  "removeMedias",
  async function (id: string, mediasIds: string[] = []) {
    const errors = [];
    const product = await this.findOne({
      _id: id,
      deleted: false,
    });
    if (!product) {
      errors.push(`Product with id ${id} does not exists`);
    }

    const mediasToBeUnLinked = [];

    for (const mediaId of mediasIds) {
      const media = await Media.findOne({
        _id: mediaId,
      });

      if (!media) {
        errors.push(`Media with id ${mediaId} does not exists`);
      } else {
        mediasToBeUnLinked.push(media);
      }
    }

    if (errors.length) {
      throw new Error(errors.join(", "));
    }

    for (const mediaToBeUnLinked of mediasToBeUnLinked) {
      await ProductMedia.findOneAndDelete({
        media: mediaToBeUnLinked.id,
        product: product.id,
      });
    }

    return await this.findOneWithCurrentPriceAndStock({
      _id: id,
      deleted: false,
    });
  }
);

ProductSchema.static(
  "findAllWithCurrentStockAndPrice",
  async function (filters): Promise<ProductDocument[]> {
    if (filters._id) {
      filters._id = new ObjectID(filters._id);
    }
    if (filters.category) {
      filters.category = new ObjectID(filters.category);
    }

    if (filters.deleted) {
      filters.deleted = filters.deleted === "0" ? false : true;
    }

    const data = await this.aggregate([
      {
        $match: filters,
      },
      {
        $project: {
          id: { $toObjectId: "$_id" },
          category: { $toObjectId: "$category" },
          createdAt: 1,
          label: 1,
          unit: 1,
          deleted: 1,
        },
      },
      {
        $lookup: {
          from: ProductPrice.collection.name,
          localField: "_id",
          foreignField: "product",
          let: { createdAt: "$createdAt" },
          pipeline: [{ $sort: { createdAt: -1 } }, { $limit: 1 }],
          as: "prices",
        },
      },
      { $addFields: { currentPrice: { $first: "$prices" } } },
      {
        $project: {
          prices: 0,
        },
      },
    ]).exec();

    return await Promise.all(
      data.map((product) => new Product(product).getCurrentStock())
    );
  }
);

ProductSchema.static(
  "findOneWithCurrentPrice",
  async function (filters): Promise<ProductDocument> {
    if (filters._id) {
      filters._id = new ObjectID(filters._id);
    }
    if (filters.category) {
      filters.category = new ObjectID(filters.category);
    }
    const data = await this.aggregate([
      {
        $match: filters,
      },
      {
        $project: {
          id: { $toObjectId: "$_id" },
          category: { $toObjectId: "$category" },
          createdAt: 1,
          label: 1,
          unit: 1,
          deleted: 1,
          ref: 1,
        },
      },
      {
        $lookup: {
          from: ProductPrice.collection.name,
          localField: "_id",
          foreignField: "product",
          let: { createdAt: "$createdAt" },
          pipeline: [{ $sort: { createdAt: -1 } }, { $limit: 1 }],
          as: "prices",
        },
      },
      { $addFields: { currentPrice: { $first: "$prices" } } },
      {
        $project: {
          prices: 0,
        },
      },
    ]).exec();

    return data.length ? new this(data[0]) : null;
  }
);

ProductSchema.static(
  "findOneWithCurrentPriceAndStock",
  async function (filters) {
    return await this.findOneWithCurrentPrice(filters).then(
      async (product) => await product.getCurrentStock()
    );
  }
);

ProductSchema.static(
  "getAnalytics",
  function (periodicity: { start: number; end: number }) {}
);

ProductSchema.static(
  "register",
  async function (data: {
    unit: string;
    label: string;
    category: string;
    ref: string;
    description: string;
  }) {
    const errors = [];
    const productCategory = await ProductCategory.exists({
      _id: data.category,
    });
    if (!productCategory) {
      errors.push(`Product category with id ${data.category} does not exists`);
    }
    if (errors.length) {
      throw new Error(errors.join(", "));
    }
    const newProduct = new this(data);
    const { id } = await newProduct.save();
    return await this.findOneWithCurrentPriceAndStock({
      _id: id,
      deleted: false,
    });
  }
);

ProductSchema.static(
  "ammendOne",
  async function (
    id: string,
    data: {
      unit?: string;
      label?: string;
      category?: string;
      ref?: string;
      description?: string;
    }
  ) {
    const errors = [];
    const product = await this.findOne({
      _id: id,
      deleted: false,
    });
    if (!product) {
      errors.push(`Product with id ${id} does not exists`);
    }
    if (data.category) {
      const productCategory = await ProductCategory.exists({
        _id: data.category,
      });
      if (!productCategory) {
        errors.push(
          `Product category with id ${data.category} does not exists`
        );
      }
    }
    if (errors.length) {
      throw new Error(errors.join(", "));
    }
    Object.assign(product, data);
    await product.save();
    return await this.findOneWithCurrentPriceAndStock({
      _id: id,
      deleted: false,
    });
  }
);

ProductSchema.static(
  "ammendOnePrice",
  async function (id: string, price: number) {
    const errors = [];
    const product = await this.findOne({
      _id: id,
      deleted: false,
    });
    if (!product) {
      errors.push(`Product with id ${id} does not exists`);
    }
    if (errors.length) {
      throw new Error(errors.join(", "));
    }
    const newProductPrice = new ProductPrice({
      product: product.id,
      price,
    });

    await newProductPrice.save();
    return await this.findOneWithCurrentPriceAndStock({
      _id: id,
      deleted: false,
    });
  }
);

ProductSchema.static("removeOne", async function (id: string) {
  const errors = [];
  const product = await this.findOne({
    _id: id,
    deleted: false,
  });
  if (!product) {
    errors.push(`Product with id ${id} does not exists`);
  }
  if (errors.length) {
    throw new Error(errors.join(", "));
  }
  Object.assign(product, {
    deleted: true,
  });
  await product.save();
  return await this.findOneWithCurrentPriceAndStock({
    _id: id,
    deleted: true,
  });
});

export const Product = model<IProduct, ProductModel>("Product", ProductSchema);
