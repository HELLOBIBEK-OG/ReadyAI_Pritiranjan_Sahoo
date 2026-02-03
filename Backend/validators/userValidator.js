const Joi = require("joi");

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(1).max(120).required(),
  phone: Joi.string().optional(),
  address: Joi.string().optional()
});

module.exports = userSchema;
