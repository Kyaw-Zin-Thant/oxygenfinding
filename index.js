import http from 'http'
import setupExpress from './src/loaders/express'
import setupMongoose from './src/loaders/mongoose'
import config from './src/config/index'
;(async () => {
  try {
    await setupMongoose()
  } catch (err) {
    console.error(err)
  }
})()

const app = setupExpress()
const server = http.createServer(app)

server.listen(config.port)

export default server
