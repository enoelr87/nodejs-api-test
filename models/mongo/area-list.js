import { MongoClient, ServerApiVersion } from 'mongodb'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
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
    return database.collection('areaList')
  } catch (error) {
    console.error('Error connecting to the database')
    console.error(error)
    await client.close()
  }
}

export class AreaListModel {
  static async getAll () {
    const db = await connect()
    return db.find({}, { projection: { _id: 0 } }).toArray()
  }

  static async getById ({ id }) {
    const db = await connect()
    return db.findOne({ id: parseInt(id) }, { projection: { _id: 0 } })
  }
}
