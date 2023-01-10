import express from "express";
import { mediasController } from "../controllers";
import {
  authorizeQueryParams,
  bearerTokenHandler,
  requireQueryParams,
  authorizeBodyParams,
  requireBodyParams,
} from "../services/middlewares";

const mediasRouter = express.Router();

mediasRouter
  .use(bearerTokenHandler)
  .post(
    "/",
    authorizeBodyParams({
      filename: true,
    }),
    requireBodyParams({
      filename: true,
    }),
    mediasController.register
  )
  .get(
    "/uploadurl",
    authorizeQueryParams({
      filename: true,
      filekey: true,
    }),
    requireQueryParams({
      filename: true,
      filekey: true,
    }),
    mediasController.getUploadURL
  )
  .get(
    "/downloadurl",
    authorizeQueryParams({
      filename: true,
      filekey: true,
    }),
    requireQueryParams({
      filename: true,
      filekey: true,
    }),
    mediasController.getDownloadURL
  )
  .get("/", mediasController.getMany)
  .get("/:id", mediasController.getOne);

export default mediasRouter;
