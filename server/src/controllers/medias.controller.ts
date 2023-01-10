import { Request, Response, NextFunction } from "express";
import { Media } from "../models/media.model";
import { APIErrorType, HttpException } from "../services/errors.service";
import { GoogleStorage } from "../services/google-storage.service";
import env from "../services/env.service";

export default {
  register: async (req: Request, res: Response, next: NextFunction) => {
    const { filename } = req.body;
    return Media.register(filename as string)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        next(
          new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message)
        );
      });
  },
  getUploadURL: async (req: Request, res: Response, next: NextFunction) => {
    const { filename, filekey } = req.query;
    const STORAGE = new GoogleStorage(
      env.GOOGLE_PROJECT_ID,
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_PRIVATE_KEY
    );

    STORAGE.generateV4UploadSignedUrl(
      env.GOOGLE_BUCKET_NAME,
      filekey as string,
      filename as string
    )
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        next(
          new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message)
        );
      });
  },
  getDownloadURL: async (req: Request, res: Response, next: NextFunction) => {
    const { filename, filekey } = req.query;
    const STORAGE = new GoogleStorage(
      env.GOOGLE_PROJECT_ID,
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_PRIVATE_KEY
    );

    STORAGE.generateV4DownloadSignedUrl(
      env.GOOGLE_BUCKET_NAME,
      filekey as string,
      filename as string
    )
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
    return Media.find({})
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        next(
          new HttpException(400, APIErrorType.API_BAD_REQUEST, error.message)
        );
      });
  },
  getOne: async (req: Request, res: Response, next: NextFunction) => {
    return Media.findOne({
      _id: req.params.id,
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
};
