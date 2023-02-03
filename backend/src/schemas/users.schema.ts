import joi from "joi";

const userSignUpSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().empty(" ").required(),
  confirmed_password: joi.any().valid(joi.ref("password")).required(),
});

const userLoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().empty(" ").required(),
});

export { userSignUpSchema, userLoginSchema };
