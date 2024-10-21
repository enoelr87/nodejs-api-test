import { Router } from 'express'

import { CheckListController } from '../controllers/check-list.js'
import { verifyJWT } from '../middlewares/verify-jwt.js'

export const createCheckListRouter = ({ checkListModel }) => {
  const checkListRouter = Router()

  const checkListController = new CheckListController({ checkListModel })

  checkListRouter.use(verifyJWT)
  checkListRouter.get('/:page/:areaId/:themeId', checkListController.getAll)

  checkListRouter.get('/:id', checkListController.getById)

  return checkListRouter
}
