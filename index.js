const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xwjoa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('heyFoodie');
        const foodCollection = database.collection('ourFoods');
        const orderCollection = database.collection('allOrders');

        // GET API - ALL PRODUCTS
        app.get("/foods", async (req, res) => {
            const cursor = foodCollection.find({});
            const foods = await cursor.toArray();

            console.log(foods);
            res.send(foods);
        });

        // GET API - single Product
        // app.get('/our-foods/:id', async (req, res) => {
        //     const id = req.params.id;
        //     console.log('Getting a specific product');

        //     const query = {_id: ObjectId(id)};
        //     const food = await foodCollection.findOne(query);

        //     console.log(food);
        //     res.send(food);
        // });

        // // GET API - All Orders
        // app.get("/all-orders", async (req, res) => {
        //     const cursor = orderCollection.find({});
        //     const orders = await cursor.toArray();

        //     console.log("All orders has been loaded");
        //     res.send(orders);
        // });

        // // GET API - My Orders
        // app.get("/my-orders/:email", async( req, res) => {
        //     const email = req.params.email;
        //     const query = {maker: { email: email}}; 
        //     const cursor = await orderCollection.find(query);
        //     const myOrders = await cursor.toArray();

        //     if ((await cursor.count()) === 0) {
        //         console.log("No documents found!");
        //     }

        //     console.log("My orders has been loaded.");
        //     res.send(myOrders);
        // });

        // // POST API - Book an Order
        // app.post('/order', async (req, res) => {
        //     const order = req.body;
        //     console.log('Hit the post API', order);

        //     const result = await orderCollection.insertOne(order);
        //     console.log(result);
        //     res.json(result);
        // });

        // // UPDATE API - Update an Order's status
        // app.put('/orders/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const updatedOrder = req.body;

        //     const filter = { _id: ObjectId(id) };
        //     const options = {upsert: true};
        //     const updateDoc = {
        //         $set: {
        //             isPending: updatedOrder.isPending
        //         }
        //     };
            
        //     const updatedObject = await orderCollection.updateOne(filter, updateDoc);

        //     console.log(updatedObject);
        //     res.json(updatedObject);
        // });

        // // DELETE API - Delete an Order
        // app.delete('/orders/:id', async(req, res) => {
        //     const id = req.params.id;
        //     const query = {_id: ObjectId(id)}

        //     const result = await orderCollection.deleteOne(query);
        //     const found = await orderCollection.findOne(query);

        //     console.log(result);
        //     console.log(found);
        //     res.json(result);
        // });

        console.log('Database connected successfully!');
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hey Foodie Server!');  
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// const ourFoods = [
//     {
//         name: 'Pizza with Salad',
//         img: 'https://i.ibb.co/G5TJsYV/lunch1.png',
//         details: "Pizzas are actually fairly traditional salads, based on ingredients. Both Pizza and traditional lettuce-based salads can have a wide variety of toppings while people still colloquially acknowledge them as members of their respective groups.",
//         price: '120',
//         type: 'lunch',
//         typeCode: 2
//     },
//     {
//         name: "Fish Roast",
//         img: "https://i.ibb.co/KGQnQtg/lunch2.png",
//         details: "But any snapper, or any medium-sized, whole round fish such as cod or haddock (as opposed to flatfish such as flounder or plaice), will work. Preheat oven to 400 degrees. Line a baking sheet with aluminum foil for easy cleanup.",
//         price: '99',
//         type: 'lunch',
//         typeCode: 2
//     },
//     {
//         name: 'Pie & Veggie',
//         img: 'https://i.ibb.co/Pz7Lq0F/lunch3.png',
//         details: "There are four types of pies: cream, fruit, custard, and savory. A pie that contains cooked meat, poultry, seafood, or vegetables in a thick sauce. Examples: Pot pies, Quiche, and Sheppard pie. Made by cooking baking uncooked along with crust.",
//         price: '139',
//         type: 'lunch',
//         typeCode: 2
//     },
//     {
//         name: 'Ground Beef',
//         img: 'https://i.ibb.co/PQPTM6F/lunch4.png',
//         details: "The terms “ground meat” and “minced meat” are sometimes used interchangeably. But they indicate two techniques for processing raw meat: ground meat is an emulsion of lean meat and fat, whereas minced meat is finely chopped skeletal-muscle meat. Ground meat is consistent and smooth; minced meat is choppy and textured.",
//         price: '399',
//         type: 'lunch',
//         typeCode: 2
//     },
//     {
//         name: 'Chicken & Chips',
//         img: 'https://i.ibb.co/mGhtt4r/lunch5.png',
//         details: "Chicken and chips is fast food made healthy. This dish consists of a piece of fried, roasted or barbecued chicken and French fries or chips. It has also become a delicacy for many in Nigeria.",
//         price: '199',
//         type: 'lunch',
//         typeCode: 2
//     },
//     {
//         name: 'Pie & Fry',
//         img: 'https://i.ibb.co/6vLXyNR/lunch6.png',
//         details: "A pie is a baked dish which is usually made of a pastry dough casing that contains a filling of various sweet or savoury ingredients. Savoury pies may be filled with meat (as in a steak pie or a Jamaican patty), eggs and cheese (quiche) or a mixture of meat and vegetables (pot pie).",
//         price: '99',
//         type: 'lunch',
//         typeCode: 2
//     },
// ]