import { Router } from "express";
import { UserService } from "../../modules/user/user.service.js";
import { Middleware } from "../../middlewares/middlewares.js";

const middleware = new Middleware();
const userRouter = Router();

const userService = new UserService();

userRouter.get(
  "/",
  middleware.checkToken,
  middleware.currentUser,
  async (req, res) => {
    try {
      const resData = await userService.getAll();
      const currentUser = req.currentUser;
      console.log("currentUser 12:", currentUser);
      res.render("index", {
        data: {
          isVisible: true,
          users: resData.data,
          message: resData.message,
          currentUser,
        },
      });
    } catch (error) {
      res.render("index", {
        data: { isVisible: true, users: [], message: error.message },
      });
    }
  }
);

export default { userRouter };
