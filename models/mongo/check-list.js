import { connectMongoDB } from '../../database/connect-db.js'

export class CheckListModel {
  static async getAllCount ({ myquery }) {
    const db = await connectMongoDB('estrategia', 'checkList')

    if (myquery) {
      const checkListCount = await db.countDocuments(myquery)
      return checkListCount
    }

    return 0
  }

  static async getAll ({ page, myquery }) {
    const db = await connectMongoDB('estrategia', 'checkList')

    if (page) {
      const resultsPerPage = 7
      const allCheckList = await db
        .find(myquery, { projection: { _id: 0 } })
        .skip(parseInt(page) * resultsPerPage)
        .limit(resultsPerPage)
        .toArray()

      return allCheckList
    }

    return db.find({}).toArray()
  }

  static async getById ({ id }) {
    const db = await connectMongoDB('estrategia', 'checkList')
    return db.findOne({ id: parseInt(id) }, { projection: { _id: 0 } })
  }
}
