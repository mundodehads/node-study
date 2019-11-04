import {
  CreateHandler,
  ReadHandler,
  UpdateHandler,
  DeleteHandler
} from './handler'
import {
  CreateValidate,
  ReadValidate,
  UpdateValidate,
  DeleteValidate
} from './validate'

export const UserCreate = Object.assign({}, {
  method: 'POST',
  path: '/users',
  config: {
    description: 'Create a user',
    notes: 'Returns 201 with the created user',
    tags: ['api'],
    handler: CreateHandler,
    validate: CreateValidate
  }
})

export const UserRead = Object.assign({}, {
  method: 'GET',
  path: '/users/{userId}',
  config: {
    description: 'Select a user by id',
    notes: 'Returns 200 with the selected user',
    tags: ['api'],
    handler: ReadHandler,
    validate: ReadValidate
  }
})

export const UserUpdate = Object.assign({}, {
  method: 'PUT',
  path: '/users/{userId}',
  config: {
    description: 'Update a user by id',
    notes: 'Returns 200 with the updated values',
    tags: ['api'],
    handler: UpdateHandler,
    validate: UpdateValidate
  }
})

export const UserDelete = Object.assign({}, {
  method: 'DELETE',
  path: '/users/{userId}',
  config: {
    description: 'Delete a user by id',
    notes: 'Returns 200',
    tags: ['api'],
    handler: DeleteHandler,
    validate: DeleteValidate
  }
})
