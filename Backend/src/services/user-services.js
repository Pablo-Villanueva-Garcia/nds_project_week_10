const Joi = require("joi")
const CreateCrudSerives = require('./crud-service')
const schema = Joi.object({
  email: Joi.string().min(1).max(50).trim(),
  password: Joi.string().min(1).max(500).trim(),
  tokem:Joi.string().min(1).max(500).trim(),
})

const UserService = CreateCrudSerives({Collection:'User',schema});


 module.exports = UserService