import express from "express"
import {genPassword} from "../helper.js"
const router = express.Router()

//find products with particular category
router.get('/register', async function (req, res) {
     const { usersname, password } = req.body;
     const hashedPassword=await genPassword(password)
     res.send(hashedPassword)
});
 
export const usersRouter = router