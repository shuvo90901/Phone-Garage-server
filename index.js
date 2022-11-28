const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.r1zym1k.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)

async function run() {
    try {
        const usersCollection = client.db('phoneGarage').collection('users');
        const productsCollection = client.db('phoneGarage').collection('products');
        const categoriesCollection = client.db('phoneGarage').collection('categories');
        const bookingsCollection = client.db('phoneGarage').collection('bookings');

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        app.get('/users', async (req, res) => {
            const query = {};
            const users = await usersCollection.find(query).toArray();
            res.send(users)
        });

        app.get('/seller', async (req, res) => {
            const email = req.query.email;
            const query = { role: 'seller' };
            const sellers = await usersCollection.find(query).toArray();
            res.send(sellers)
        });

        app.get('/seller/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const sellers = await usersCollection.findOne(query);
            res.send(sellers)
        });


        app.put('/seller/verify/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const optoins = { upsert: true }
            const updatedDoc = {
                $set: {
                    status: 'verified'
                }
            }
            const result = await usersCollection.updateOne(filter, updatedDoc, optoins);
            res.send(result)
        })

        app.get('/customer', async (req, res) => {
            const query = { role: 'customer' };
            const customers = await usersCollection.find(query).toArray();
            res.send(customers)
        })

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(filter);
            res.send(result)
        })

        app.get('/categories', async (req, res) => {
            const query = {};
            const categories = await categoriesCollection.find(query).toArray();
            res.send(categories)
        })

        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await productsCollection.insertOne(product);
            res.send(result);
        })

        app.get('/products', async (req, res) => {
            const query = {};
            const products = await productsCollection.find(query).toArray();
            res.send(products)
        })

        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { category_id: id }
            const result = await productsCollection.find(filter).toArray();
            res.send(result)
        })

        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            const result = await bookingsCollection.insertOne(booking)
            res.send(result)
        })

        app.get('/bookings', async (req, res) => {
            const query = {};
            const result = await bookingsCollection.find(query).toArray();
            res.send(result)
        })

    }
    finally {

    }
}
run().catch(console.log)


app.get('/', async (req, res) => {
    res.send('Phone Garage server is running')
})

app.listen(port, () => console.log(`phone garage running on ${port}`))