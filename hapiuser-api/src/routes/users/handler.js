export const CreateHandler = (request, h) => {
  const MockCreate = {
    userId: 1
  }

  const response = h.response(MockCreate).code(201)
  response.type('application/json')
  return response
}

export const ReadHandler = (request, h) => {
  const MockSelect = {
    username: 'admin',
    password: 'admin'
  }

  const response = h.response(MockSelect)
  response.type('application/json')
  return response
}

export const UpdateHandler = (request, h) => {
  const MockUpdate = {
    username: request.payload.username || 'admin',
    password: request.payload.password || 'admin'
  }

  const response = h.response(MockUpdate).code(200)
  response.type('application/json')
  return response
}

export const DeleteHandler = (request, h) => {
  const response = h.response()
  response.type('application/json')
  return response
}
