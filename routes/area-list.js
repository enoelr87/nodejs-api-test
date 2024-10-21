import { Router } from 'express'

import { AreaListController } from '../controllers/area-list.js'
import { verifyJWT } from '../middlewares/verify-jwt.js'

export const createAreaListRouter = ({ areaListModel }) => {
  const areaListRouter = Router()

  const areaListController = new AreaListController({ areaListModel })

  areaListRouter.use(verifyJWT)
  areaListRouter.get('/', areaListController.getAll)

  areaListRouter.get('/:id', areaListController.getById)

  return areaListRouter
}
