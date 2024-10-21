import express, { json } from 'express'
import { createAuthRouter } from './routes/auth.js'
import { createUserRouter } from './routes/users.js'
import { createCheckListRouter } from './routes/check-list.js'
import { createAreaListRouter } from './routes/area-list.js'
import { corsMiddleware } from './middlewares/cors.js'
import { config } from 'dotenv-safe'
config()

export const createApp = ({ userModel, areaListModel, checkListModel }) => {
  const app = express()
  app.use(json())
  app.disable('x-powered-by')
  app.use(corsMiddleware())

  app.use('/auth', createAuthRouter({ userModel }))
  app.use('/users', createUserRouter({ userModel }))
  app.use('/areaList', createAreaListRouter({ areaListModel }))
  app.use('/checkList', createCheckListRouter({ checkListModel }))

  const PORT = process.env.PORT ?? 3000

  app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
  })
}
