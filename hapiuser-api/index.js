import { ApplicationServer } from './src/index'

ApplicationServer
  .then(async (Server) => {
    await Server.start()
    console.log('hapi user api has started')
  })
  .catch(err => console.log(err))
