import Joi from "joi";

export const messageCreateSchema = Joi.object({
  message: Joi.string().required().max(1000),
  to: Joi.string().guid({
    version: ["uuidv4"],
  }),
});
