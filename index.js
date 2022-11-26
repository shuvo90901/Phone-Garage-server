const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.r1zym1k.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)

async function run() {
    try {

    }
    finally {

    }
}
run().catch(console.log)


app.get('/', async (req, res) => {
    res.send('Phone Garage server is running')
})

app.listen(port, () => console.log(`phone garage running on ${port}`))