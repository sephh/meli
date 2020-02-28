import express from 'express'
import { json, urlencoded } from 'body-parser'
import config from './config'
import cors from 'cors'
import itemRouter from './resources/item/item.router'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/api/items', itemRouter)

export const start = () => {
  try {
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}
