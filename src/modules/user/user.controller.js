import { UserBadRequestException } from "./exception/user.exception.js";
import { userRegisterSchema, userLoginSchema } from "./schema/user.schema.js";
import { ee } from "../../lib/eventEmitter.js";
import { generatedId } from "../../lib/generationId.js";

export class UserController {
  #userService;
  constructor(userService) {
    this.#userService = userService;
  }

  async register(req, res) {
    try {
      const dto = req.body;

      const validated = userRegisterSchema.validate(dto);

      if (validated.error) {
        throw new UserBadRequestException(validated.error.message);
      }

      const resData = await this.#userService.create(dto);

      res.cookie("token", resData.data.token);

      const uuid = generatedId();

      ee.emit("new-user", { data: resData.data.user, id: uuid });

      return res.redirect("/");
    } catch (error) {
      res.render("register", {
        data: { isVisible: true, message: error.message },
      });
    }
  }

  async login(req, res) {
    try {
      const dto = req.body;
      const validated = userLoginSchema.validate(dto);

      if (validated.error) {
        throw new UserBadRequestException(validated.error.message);
      }

      const resData = await this.#userService.login(dto);

      res.cookie("token", resData.data.token);

      return res.redirect("/");
    } catch (error) {
      res.render("login", {
        data: { isVisible: true, message: error.message },
      });
    }
  }
}
