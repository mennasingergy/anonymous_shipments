import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import {} from 'dotenv/config';



import postRoutes from './routes/shipments.js'

const app=express();
const port= process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/shipments',postRoutes);


app.use(cors());
app.use(express.json());

const uri=process.env.ATLAS_URI;
mongoose.connect(uri);
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("mongoDB database conncetion established successfully");
})
app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
})