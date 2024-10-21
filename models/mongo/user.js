import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
const uri = 'mongodb+srv://enoel:enoel@cluster0.x9s9fd4.mongodb.net/?retryWrites=true&w=majority'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

async function connect () {
  try {
    await client.connect()
    const database = client.db('estrategia')
    return database.collection('users')
  } catch (error) {
    console.error('Error connecting to the database')
    console.error(error)
    await client.close()
  }
}

export class UserModel {
  static async getAll ({ role }) {
    const db = await connect()

    if (role) {
      return db.find({ role: { $regex: new RegExp(role, 'i') } }).toArray()
    }

    return db.find({}).toArray()
  }

  static async getById ({ id }) {
    const db = await connect()
    const objectId = new ObjectId(id)
    return db.findOne({ _id: objectId })
  }

  static async getByUsernameAndPassword ({ username, password }) {
    const db = await connect()

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
    const db = await connect()

    const { insertedId } = await db.insertOne(input)

    return {
      id: insertedId,
      ...input
    }
  }

  static async delete ({ id }) {
    const db = await connect()
    const objectId = new ObjectId(id)
    const { deletedCount } = await db.deleteOne({ _id: objectId })
    return deletedCount > 0
  }

  static async update ({ id, input }) {
    const db = await connect()
    const objectId = new ObjectId(id)

    const { ok, value } = await db.findOneAndUpdate({ _id: objectId }, { $set: input }, { returnNewDocument: true })

    if (!ok) return false

    return value
  }
}
