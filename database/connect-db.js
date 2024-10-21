import { MongoClient, ServerApiVersion } from 'mongodb'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export async function connectMongoDB (db, collection) {
  try {
    await client.connect()
    const database = client.db(db)
    return database.collection(collection)
  } catch (error) {
    console.error('Error connecting to the database')
    console.error(error)
    await client.close()
  }
}
