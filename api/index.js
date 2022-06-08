import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
//import {default as products} from '../products.js'

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(express.json());
// app.use("/api/products", productRoute);

//app.get('/api/shipments', async (req, res) => {
 // res.json(shipments);
//});



app.get('/api/find/:search',async (req, res) => {
  const {search} = req.params;
//res.send("search for this product");
await shipments.find({"order_id": {$regex: search, $options:"i"} }) 
 .then(shipments => res.json(shipments))
 .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(process.env.PORT || 9000, () =>
  console.log(`Server running on port : ${process.env.PORT}`)
);

const DB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {});
  console.log(`mongo connected host : ${conn.connection.host}`);
};

DB();