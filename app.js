import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { createUserRouter } from './routes/users.js'
import { corsMiddleware } from './middlewares/cors.js'

export const createApp = ({ userModel }) => {
  const app = express()
  app.use(json())
  app.disable('x-powered-by')
  app.use(corsMiddleware())

  // app.use('/movies', moviesRouter)
  app.use('/users', createUserRouter({ userModel }))

  const PORT = process.env.PORT ?? 3000

  app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
  })
}
