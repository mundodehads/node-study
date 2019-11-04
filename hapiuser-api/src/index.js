import * as Hapi from 'hapi'
import * as Inert from 'inert'
import * as Vision from 'vision'
import * as HapiSwagger from 'hapi-swagger'
import {
  ServerOptions, SwaggerOptions
} from './options'
import {
  UserCreate, UserRead, UserUpdate, UserDelete
} from './routes/users'

const registerPlugins = async (Server) => {
  const Plugins = [
    Inert,
    Vision,
    { plugin: HapiSwagger, options: SwaggerOptions }
  ]
  await Server.register(Plugins)
  return Promise.resolve(Server)
}

const registerRoutes = (Server) => {
  Server.route([UserCreate, UserRead, UserUpdate, UserDelete])
  return Promise.resolve(Server)
}

export const ApplicationServer = new Promise((resolve, reject) => {
  const Server = new Hapi.Server(ServerOptions)
  registerPlugins(Server)
    .then(registerRoutes)
    .then(resolve)
})
