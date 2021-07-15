import express from 'express'
import bodyParser from 'body-parser'

import { errorHandler } from '../middlewares/handlers.middleware'

import path from 'path'
import glob from 'glob'
import morgan from 'morgan'
import compression from 'compression'
import cors from 'cors'

import redoc from 'redoc-express'
import * as swaggerJson from '../docs/swagger.json'

function setupExpress () {
  const app = express()

  app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }))
  app.use(bodyParser.text({ limit: '500mb', extended: true }))
  app.use(bodyParser.json({ limit: '500mb' }))
  app.use(morgan('dev'))
  app.use(compression())
  app.use(
    cors({
      origin: (origin, callback) => {
        return callback(null, true)
      },
      optionsSuccessStatus: 200,
      credentials: true,
      exposedHeaders: '*'
    })
  )

  const dir = path.join(__dirname, '../routes/*.js')
  const routes = glob.sync(dir)
  routes.forEach(route => {
    require(route).default(app)
  })

  // shows plain json format
  app.get('/docs/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.json(swaggerJson)
  })

  // shows swagger format
  app.get(
    '/docs',
    redoc({
      title: 'API Docs',
      specUrl: '/docs/swagger.json'
    })
  )

  app.use(errorHandler)
  return app
}

export default setupExpress
