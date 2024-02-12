import { Router } from "express";
import { Middleware } from "../../middlewares/middlewares.js";
import { MessageService } from "../../modules/message/message.service.js";

const middleware = new Middleware();
const messageRouter = Router();

const messageService = new MessageService();

messageRouter.get(
  "/",
  middleware.checkToken,
  middleware.currentUser,
  async (req, res) => {
    try {
      // const resData = await messageService.getAll();
      // const currentUser = req.currentUser;
      res.render("message", {
        data: {
          isVisible: true,
        },
      });
    } catch (error) {
      res.redirect("/login");
    }
  }
);

export default { messageRouter };
