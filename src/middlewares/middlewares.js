import { verifyToken } from "../lib/jwt.js";
import { TokenRequiredException } from "./exception/middleware.exception.js";
import { UserService } from "../modules/user/user.service.js";

const userService = new UserService();

export class Middleware {
  async checkToken(req, res, next) {
    try {
      const token = req.cookies?.token;

      if (!token) {
        throw new TokenRequiredException();
      }

      const userId = verifyToken(token);
      req.userId = userId;

      return next();
    } catch (error) {
      res.render("login", {
        data: { isVisible: true, message: error.message },
      });
    }
  }

  async currentUser(req, res, next) {
    try {
      const userId = req.userId;
      const currentUser = await userService.getUserById(userId);

      req.currentUser = currentUser.data;
      return next();
    } catch (error) {
      res.render("register", {
        data: { isVisible: true, message: error.message },
      });
    }
  }
}
