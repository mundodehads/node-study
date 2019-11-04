import * as Joi from 'joi'

export const CreateValidate = {
  payload: {
    username: Joi.string()
      .max(45)
      .required()
      .description('The user name'),

    password: Joi.string()
      .max(45)
      .required()
      .description('The user name')
  }
}

export const ReadValidate = {
  params: {
    userId: Joi.number()
      .integer()
      .required()
      .description('The id from the user to be select')
  }
}

export const UpdateValidate = {
  payload: {
    username: Joi.string()
      .max(45)
      .optional()
      .description('The user name'),

    password: Joi.string()
      .max(45)
      .optional()
      .description('The user name')
  }
}

export const DeleteValidate = {
  params: {
    userId: Joi.number()
      .integer()
      .required()
      .description('The id from the user to be deleted')
  }
}
