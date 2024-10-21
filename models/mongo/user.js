import { ObjectId } from 'mongodb'
import { connectMongoDB } from './connect-db.js'

export class UserModel {
  static async getAll ({ role }) {
    const db = await connectMongoDB('estrategia', 'users')

    if (role) {
      return db.find({ role: { $regex: new RegExp(role, 'i') } }).toArray()
    }

    return db.find({}).toArray()
  }

  static async getById ({ id }) {
    const db = await connectMongoDB('estrategia', 'users')
    const objectId = new ObjectId(id)
    return db.findOne({ _id: objectId })
  }

  static async getByUsernameAndPassword ({ username, password }) {
    const db = await connectMongoDB('estrategia', 'users')

    if (username && password) {
      const user = await db.findOne({
        username: { $regex: new RegExp(`^${username}$`, 'i') }
      })
      if (user) {
        // Compara la contraseña ingresada con la almacenada (encriptada)
        const passwordMatch = password === user.password

        if (passwordMatch) {
          return user
        }
      }
    }

    return null
  }

  static async create ({ input }) {
    const db = await connectMongoDB('estrategia', 'users')

    const { insertedId } = await db.insertOne(input)

    return {
      id: insertedId,
      ...input
    }
  }

  static async delete ({ id }) {
    const db = await connectMongoDB('estrategia', 'users')
    const objectId = new ObjectId(id)
    const { deletedCount } = await db.deleteOne({ _id: objectId })
    return deletedCount > 0
  }

  static async update ({ id, input }) {
    const db = await connectMongoDB('estrategia', 'users')
    const objectId = new ObjectId(id)

    const { ok, value } = await db.findOneAndUpdate({ _id: objectId }, { $set: input }, { returnNewDocument: true })

    if (!ok) return false

    return value
  }
}
