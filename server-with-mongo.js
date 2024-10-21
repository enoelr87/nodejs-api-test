import { createApp } from './app.js'

import { UserModel } from './models/mongo/user.js'
import { AreaListModel } from './models/mongo/area-list.js'
import { CheckListModel } from './models/mongo/check-list.js'

createApp({ userModel: UserModel, areaListModel: AreaListModel, checkListModel: CheckListModel })
