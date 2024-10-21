import { Router } from 'express'

import { UserController } from '../controllers/users.js'
import { verifyJWT } from '../middlewares/verify-jwt.js'

export const createUserRouter = ({ userModel }) => {
  const usersRouter = Router()

  const userController = new UserController({ userModel })

  usersRouter.use(verifyJWT)
  usersRouter.get('/', userController.getAll)
  usersRouter.post('/', userController.create)

  usersRouter.get('/:id', userController.getById)
  usersRouter.delete('/:id', userController.delete)
  usersRouter.patch('/:id', userController.update)

  return usersRouter
}
