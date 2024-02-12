import { Router } from "express";
import userModule from "./user/user.module.js";
import messageModule from "./message/message.module.js";

const router = Router();

router.use("/user", userModule.userRouter);
router.use("/message", messageModule.messageRouter);

export default { router };
