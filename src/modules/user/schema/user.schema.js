import Joi from "joi";

export const userRegisterSchema = Joi.object({
  login: Joi.string().required().min(3).max(100),
  password: Joi.string().required(),
  fullName: Joi.string().required(),
  comparePassword: Joi.ref("password"),
});

export const userLoginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});
