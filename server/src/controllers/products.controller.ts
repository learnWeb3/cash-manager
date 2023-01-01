import { Request, Response, NextFunction } from "express";
import { APIErrorType, HttpException } from "../services/errors.service";
import { Product } from "../models/product.model";

export default {
  register: async (req: Request, res: Response, next: NextFunction) => {
    return Product.register(req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        next(
          new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message)
        );
      });
  },
  getMany: async (req: Request, res: Response, next: NextFunction) => {
    return Product.findAllWithCurrentPriceAndStockAndMedias(req.query)
      .then(async (data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        next(
          new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message)
        );
      });
  },
  getOne: async (req: Request, res: Response, next: NextFunction) => {
    return Product.findOneWithCurrentPriceAndStockAndMedias({
      _id: req.params.id,
      deleted: false,
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        next(
          new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message)
        );
      });
  },
  ammendOne: async (req: Request, res: Response, next: NextFunction) => {
    return Product.ammendOne(req.params.id, req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        next(
          new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message)
        );
      });
  },
  deleteOne: async (req: Request, res: Response, next: NextFunction) => {
    return Product.removeOne(req.params.id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        next(
          new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message)
        );
      });
  },
  ammendOnePrice: async (req: Request, res: Response, next: NextFunction) => {
    return Product.ammendOnePrice(req.params.id, req.body.price)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        next(
          new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message)
        );
      });
  },

  addMedias: async (req: Request, res: Response, next: NextFunction) => {
    return Product.addMedias(req.params.id, req.body.mediaIds)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        next(
          new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message)
        );
      });
  },

  removeMedias: async (req: Request, res: Response, next: NextFunction) => {
    return Product.removeMedias(req.params.id, req.body.mediaIds)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        next(
          new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message)
        );
      });
  },
};
