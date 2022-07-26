const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT||5000;
app.use(cors());
app.use(express.json());
require('dotenv').config();

const { MongoClient, ServerApiVersion ,ObjectId} = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ronfa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})