import express from 'express'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import * as apiDoc from './apiDoc/openapi.json'

import '@Config'

import { router } from './routes'
import { Mid } from './middleware'
import { logMsg } from '@Utils'
import { connect } from '@Config/sequelize'

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(apiDoc))
app.use(router)

app.use(Mid.boomErrorHandler)
app.use(Mid.errorHandler)

app.listen(process.env.PORT, async () => {
  await connect()
  logMsg(`Serven ON --> PORT ${process.env.PORT}`)
})
