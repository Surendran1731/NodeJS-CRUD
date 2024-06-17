import express from "express"
import { getParticularProduct, addProducts, deleteProducts, updatePrducts ,getAllProducts} from "../helper.js";

const router = express.Router()

//find products with particular category
router.get('/products', async function (req, res) {
     const { category, rating } = req.query;
     console.log(req.query, category, rating);

     try {
          let query = {};
          if (category) {
               query.category = category;
               // console.log(filterProducts);
               // filterProducts=filterProducts.filter((pd)  => pd.category === category)
          }
          if (rating) {
               //+rating is string to number
               // filterProducts= filterProducts.filter((pd)  => pd.rating == +rating)
               query.rating = +rating;
          }
          const filterProducts = await getAllProducts(query);
          if (filterProducts.length > 0) {
               res.send(filterProducts);
          }
          else {
               res.status(400).send({ message: "Products not found" });
          }
     }
     catch (error) {
          res.status(500).send({ message: "Invalid Products" });
     }

});
//find products with particular with use id
router.get('/products/:id', async function (req, res) {
     //to get a particular id value
     const { id } = req.params;
     console.log(req.params, id);
     try {
          //const product=await products.find((pd)  => pd.id === id)
          const product = await getParticularProduct(id);
          if (product) {
               res.send(product);
          } else {
               res.status(400).send({ message: "Products not found" });
          }

     } catch (error) {
          res.status(500).send({ message: "Invalid Products" });
     }

});
// add products
router.post('/products', async function (req, res) {
     //req.body => is use to add data in body
     const newProduct = req.body;
     console.log(newProduct);
     const result = await addProducts(newProduct);
     res.send(result);
});
//delete product 
router.delete('/products/:id', async function (req, res) {
     //to get a particular id value
     const { id } = req.params;
     console.log(req.params, id);
     const productDelete = await deleteProducts(id);
     res.send(productDelete);
});
//update products
router.put('/products/:id', async function (req, res) {
     const { id } = req.params;
     const updatedProduct = req.body;
     const result = await updatePrducts(id, updatedProduct);
     res.send(result);
});

export const productsRouter = router