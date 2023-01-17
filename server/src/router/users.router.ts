import express from "express";
import { userController } from "../controllers";
import { Role } from "../models/role.model";
import {
  authorizeBodyParams,
  bearerTokenHandler,
  requireBodyParams,
  roleGuard,
} from "../services/middlewares";

const usersRouter = express.Router();

usersRouter
  .use(bearerTokenHandler)
  .get("/", userController.getAll)
  .get("/:id", userController.get)
  .patch(
    "/:id",
    roleGuard([Role.ADMIN, Role.COMPANY_ADMIN]),
    authorizeBodyParams({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      currentPassword: true,
    }),
    requireBodyParams({
      currentPassword: true,
    }),
    userController.ammendOne
  );

export default usersRouter;
