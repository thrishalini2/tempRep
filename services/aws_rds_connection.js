// const express = require('express');
// const { MongoClient } = require('mongodb');
const {Client} = require('pg');
// const app = express();
// const port = 3000;

// const uri = 'mongodb+srv://<username>:<password>@<cluster-address>/<dbname>?retryWrites=true&w=majority';
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// app.get('/users', async (req, res) => {
//   try {
//     await client.connect();

//     const database = client.db('<dbname>');
//     const collection = database.collection('<collection-name>');

//     const users = await collection.find().toArray();
//     res.json(users);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'An error occurred' });
//   } finally {
//     client.close();
//   }
// });


const client = new Client({
  host : "database-2.c4sxoawklo3k.ap-southeast-1.rds.amazonaws.com",
  user : "postgres",
  port: 5432,
  password : "masterPassword",
  database : "database-2",
  // dialect : "postgres"
})

client.connect((err)=>{
  if(err) 
  throw err;
});

// console.log(client)

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });



