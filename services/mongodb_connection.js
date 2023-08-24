const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<thrishalini>:<Sairam@1312>@cluster0.a1krhab.mongodb.net/?retryWrites=true&w=majority";
const uri ="mongodb+srv://trishalini973:Sairam%401312@cluster0.a1krhab.mongodb.net";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


let database; // Store the database instance

async function connectMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    database = client.db("Plotline");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

function getDatabase() {
  return database;
}

async function closeMongoDB() {
  await client.close();
  console.log("Closed MongoDB connection");
}

module.exports = { connectMongoDB, getDatabase, closeMongoDB };

// module.exports = { client };

