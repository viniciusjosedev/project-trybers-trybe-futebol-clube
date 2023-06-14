import Joi = require('joi');

const userBodyLoginSchema = Joi.object({
  email: Joi.string().min(1).required(),
  password: Joi.string().min(1).required(),
});

export default {
  userBodyLoginSchema,
};
