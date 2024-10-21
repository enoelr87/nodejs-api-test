export class CheckListController {
  constructor ({ checkListModel }) {
    this.checkListModel = checkListModel
  }

  getAll = async (req, res) => {
    const { page, areaId, themeId } = req.params
    const myquery = {}

    if (areaId > 0) {
      myquery.area_id = parseInt(areaId)
    }
    if (themeId > 0) {
      myquery.theme_id = parseInt(themeId)
    }

    const checkListCount = await this.checkListModel.getAllCount({ myquery })
    const allCheckList = await this.checkListModel.getAll({ page, myquery })

    res.json({ data: allCheckList, count: checkListCount })
  }

  getById = async (req, res) => {
    const { id } = req.params
    const checkList = await this.checkListModel.getById({ id })
    if (checkList) return res.json(checkList)
    res.status(404).json({ message: 'Check List not found' })
  }
}
