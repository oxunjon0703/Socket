import { Router } from "express";

const loginRouter = Router();

loginRouter.get("/", async (req, res) => {
  try {
    zz;
    res.render("login", { data: { isVisible: false } });
  } catch (error) {
    res.render("login", {
      data: { isVisible: true, message: error.message },
    });
  }
});

export default { loginRouter };
