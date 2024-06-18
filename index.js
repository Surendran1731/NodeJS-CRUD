// const express = require('express')
// const { MongoClient } = require('mongodb');
//when to use import method all the function run easy where example async and await is use any where await is use 
//without async
 
import express from "express";
import { MongoClient } from 'mongodb';
import cors from 'cors';
import { productsRouter } from "./routes/products.js";
import * as dotenv from 'dotenv'
import bcrypt from "bcrypt";
import { usersRouter } from "./routes/users.js";

export const app = express()
const PORT=2429;
dotenv.config()
//Inbuilt middleware =>  say data is in json => converting body to json
app.use(express.json())
app.use(cors())
// console.log(process.env.MONGO_URL);

const MONGO_URL=process.env.MONGO_URL;
// process.env.MONGO_URL;
// 'mongodb://127.0.0.1:27017'
// 'mongodb://localhost:27017'
async function createConnection(){
    const client=new MongoClient(MONGO_URL) 
    await client.connect() 
    console.log("Mongo DB is connected") 
    return client
}
export const client=await createConnection();

     app.get('/', function (req, res) {
     res.send('Hello World')
     })
     // to get a products
     app.use("/products", productsRouter)

     app.use("/users", usersRouter)




app.listen(PORT,()=>(`SERVER RUNNING SUCCESSFULLY ${PORT}`))