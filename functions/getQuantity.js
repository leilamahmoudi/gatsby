require('dotenv').config()
const { MongoClient } = require('mongodb')

const url = process.env.MONGO_URI

const dbConnection = async () => {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  try {
    await client.connect()
    const db = client.db('myFirstDatabase')
    return await db.collection('products')
  } catch (err) {
    return err
  } finally {
    setTimeout(() => client.close(), 1000)
  }
}

const getAllProducts = async (slug) => {
  const productsCollection = await dbConnection()
  const product = await productsCollection.findOne({ slug })
  return product
}

exports.handler = async (event, context) => {
  try {
    const product = await getAllProducts(slug)
    return {
      statusCode: 200,
      body: JSON.stringify(product.quantity),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    }
  }
}
