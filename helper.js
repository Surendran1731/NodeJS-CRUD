import { client } from "./index.js";
import bcrypt from "bcrypt";

 async function getParticularProduct(id) {
     return await client.db("CRUD").collection("products").findOne({ id: id });
}
 async function addProducts(newProduct) {
     return await client.db("CRUD").collection("products").insertMany(newProduct);
}
 async function updatePrducts(id, updatedProduct) {
     return await client.db("CRUD").collection("products").updateOne({ id: id }, { $set: updatedProduct });
}
 async function deleteProducts(id) {
     return await client.db("CRUD").collection("products").deleteOne({ id: id });
}

 async function getAllProducts(query) {
     return await client.db("CRUD").collection("products").find(query).toArray();
}

async function genPassword(password){
     const salt =await bcrypt.genSalt(10) //bcrypt.genSalt(no.of rounds)
     console.log(salt);
     const hashedPassword = await bcrypt.hash(password, salt)
     console.log(hashedPassword) 
     return hashedPassword
 }

 async function createUser(username, hashedPassword) {
     return await client.db("CRUD").collection("users")
         .insertOne({ username: username, password: hashedPassword });
 }


async function getUserByName(username) {
     return await client.db("CRUD").collection("users")
         .findOne({ username: username });
 }

 
 export { getParticularProduct, 
     addProducts, 
     deleteProducts, 
     updatePrducts ,
     getAllProducts,
     genPassword,
     createUser,
     getUserByName
}