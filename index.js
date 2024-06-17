// const express = require('express')
// const { MongoClient } = require('mongodb');
//when to use import method all the function run easy where example async and await is use any where await is use 
//without async
 
import express from "express";
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT=2429;

//Inbuilt middleware =>  say data is in json => converting body to json
app.use(express.json())

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
const client=await createConnection();

     app.get('/', function (req, res) {
     res.send('Hello World')
     })


     //find products with particular category
     app.get('/products', async function (req, res) {
          const {category,rating}=req.query
          console.log(req.query,category,rating);

          try{
             let query={}
               if(category){
                query.category=category
                // console.log(filterProducts);
                // filterProducts=filterProducts.filter((pd)  => pd.category === category)
               }
              if(rating){
                //+rating is string to number
                // filterProducts= filterProducts.filter((pd)  => pd.rating == +rating)
                query.rating=+rating
               }
               const filterProducts=await client.db("CRUD").collection("products").find(query).toArray();
               if(filterProducts.length > 0){
                    res.send(filterProducts)
               }
               else{
                    res.status(400).send({message:"Products not found"})
               }}
          catch(error){
               res.status(500).send({message:"Invalid Products"})
               }

     })

     //find products with particular with use id
     app.get('/products/:id', async function(req, res) {
        //to get a particular id value
        const {id}=req.params
        console.log(req.params,id);
        try{
            //const product=await products.find((pd)  => pd.id === id)
            const product=await client.db("CRUD").collection("products").findOne({id:id})
            if(product){
                    res.send(product)
            }else{
                res.status(400).send({message:"Products not found"})
            }
            
        }catch(error){
            res.status(500).send({message:"Invalid Products"})
        }
        
      })

      // add products
      app.post('/products', async function (req, res) {
        //req.body => is use to add data in body
        const newProduct=req.body
        console.log(newProduct);
        const result=await client.db("CRUD").collection("products").insertMany(newProduct) 
        res.send(result)
     })          

     //delete product 
     app.delete('/products/:id', async function(req, res) {
        //to get a particular id value
        const {id}=req.params
        console.log(req.params,id);
        const productDelete=await client.db("CRUD").collection("products").deleteOne({id:id}) 
        res.send(productDelete)
      })
     
      //update products
      app.put('/products/:id', async function(req, res) {
        const { id } = req.params;
        const updatedProduct = req.body;
        const result=await client.db("CRUD").collection("products").updateOne({ id:id },{$set: updatedProduct }) 
        res.send(result)
      })

app.listen(PORT,()=>(`SERVER RUNNING SUCCESSFULLY ${PORT}`))