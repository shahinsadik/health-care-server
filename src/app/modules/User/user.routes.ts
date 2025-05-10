import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { jwtHelper } from "../../../helpers/jwtHelper";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const router = express.Router();

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("You Are Not Authorized!");
      }
      const verifiedUser = jwtHelper.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      );
      console.log(verifiedUser);
      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new Error("You Are Not Authorized!");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

router.post("/", auth("ADMIN", "SUPER_ADMIN"), UserController.createAdmin);

export const UserRoutes = router;
