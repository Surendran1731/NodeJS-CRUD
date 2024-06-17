import { client } from "./index.js";


export async function getParticularProduct(id) {
     return await client.db("CRUD").collection("products").findOne({ id: id });
}
export async function addProducts(newProduct) {
     return await client.db("CRUD").collection("products").insertMany(newProduct);
}
export async function updatePrducts(id, updatedProduct) {
     return await client.db("CRUD").collection("products").updateOne({ id: id }, { $set: updatedProduct });
}
export async function deleteProducts(id) {
     return await client.db("CRUD").collection("products").deleteOne({ id: id });
}

export async function getAllProducts(query) {
     return await client.db("CRUD").collection("products").find(query).toArray();
}
