import { Router } from "express";

const registerRouter = Router();

registerRouter.get("/", async (req, res) => {
  try {
    res.render("register", { data: { isVisible: false } });
  } catch (error) {
    res.render("register", {
      data: { isVisible: true, message: error.message },
    });
  }
});

export default { registerRouter };
