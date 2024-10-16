import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { usersRouter } from './routes/users.js'
import { corsMiddleware } from './middlewares/cors.js'

const PORT = process.env.PORT ?? 3000

const app = express()
app.disable('x-powered-by')
app.use(corsMiddleware())

app.use(json())

app.use('/movies', moviesRouter)
app.use('/users', usersRouter)

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`)
})
