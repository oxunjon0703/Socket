import { Router } from "express";
import userRenderModule from "./index/index-render.module.js";
import registerRenderModule from "./register/register-render.module.js";
import loginRenderModule from "./login/login-render.module.js";
import messageRenderModule from "./message/message-render.module.js";

const router = Router();

router.use("/message", messageRenderModule.messageRouter);
router.use("/register", registerRenderModule.registerRouter);
router.use("/login", loginRenderModule.loginRouter);
router.use("/", userRenderModule.userRouter);
export default { router };
