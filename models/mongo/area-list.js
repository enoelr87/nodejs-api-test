import { connectMongoDB } from './connect-db.js'

export class AreaListModel {
  static async getAll () {
    const db = await connectMongoDB('estrategia', 'areaList')
    return db.find({}, { projection: { _id: 0 } }).toArray()
  }

  static async getById ({ id }) {
    const db = await connectMongoDB('estrategia', 'areaList')
    return db.findOne({ id: parseInt(id) }, { projection: { _id: 0 } })
  }
}
