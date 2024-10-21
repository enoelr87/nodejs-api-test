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
    return database.collection('checkList')
  } catch (error) {
    console.error('Error connecting to the database')
    console.error(error)
    await client.close()
  }
}

export class CheckListModel {
  static async getAllCount ({ myquery }) {
    const db = await connect()

    if (myquery) {
      const checkListCount = await db.countDocuments(myquery)
      return checkListCount
    }

    return 0
  }

  static async getAll ({ page, myquery }) {
    const db = await connect()

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
    const db = await connect()
    return db.findOne({ id: parseInt(id) }, { projection: { _id: 0 } })
  }
}
