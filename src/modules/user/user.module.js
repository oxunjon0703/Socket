import { Router } from "express";
import { UserService } from "./user.service.js";
import { UserController } from "./user.controller.js";

const userRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.post("/register", (req, res) => {
  userController.register(req, res);
});

userRouter.post("/login", (req, res) => {
  userController.login(req, res);
});

export default { userRouter };
