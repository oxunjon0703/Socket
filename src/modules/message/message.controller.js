import { messageCreateSchema } from "./schema/message.schema.js";
import { ee } from "../../lib/eventEmitter.js";
import { generatedId } from "../../lib/generationId.js";
import { MessageBadRequestException } from "./exception/message.exception.js";

export class MessageController {
  #messageService;
  constructor(messageService) {
    this.#messageService = messageService;
  }

  async create(req, res) {
    try {
      const dto = req.body;

      const validated = messageCreateSchema.validate(dto);

      if (validated.error) {
        throw new MessageBadRequestException(validated.error.message);
      }

      const resData = await this.#messageService.create(dto);

      const uuid = generatedId();

      ee.emit("new-message", { data: resData.data, id: uuid });

      return res.redirect("/message");
    } catch (error) {
      res.render("register", {
        data: { isVisible: true, message: error.message },
      });
    }
  }
}
