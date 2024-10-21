import { Router } from 'express'

import { BaseController } from '../controllers/base.js'

export const createBaseRouter = ({ userModel }) => {
  const baseRouter = Router()

  const baseController = new BaseController({ userModel })

  baseRouter.use(baseController.verifySession)

  return baseRouter
}
