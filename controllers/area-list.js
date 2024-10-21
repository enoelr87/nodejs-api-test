export class AreaListController {
  constructor ({ areaListModel }) {
    this.areaListModel = areaListModel
  }

  getAll = async (req, res) => {
    const allAreaList = await this.areaListModel.getAll()
    res.status(200).json(allAreaList)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const checkList = await this.areaListModel.getById({ id })
    if (checkList) return res.json(checkList)
    res.status(404).json({ message: 'Area not found' })
  }
}
