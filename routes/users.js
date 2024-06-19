import express from "express"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { genPassword, createUser,getUserByName} from "../helper.js"
const router = express.Router()
 


//register
router.post('/register', async (req, res) => {
     const { username, password } = req.body
     //validate user
     const isUserExist = await getUserByName(username)
     console.log(isUserExist)
     if (isUserExist) {
         res.status(400).send({ message: "Username already taken" })
         return
     }
     const hashedPassword = await genPassword(password)
     const result = await createUser(username, hashedPassword)
     res.send(result)
 });
 
 router.post('/login', async (req, res) => {
     const { username, password } = req.body
     //validate user
     const userFromDB = await getUserByName(username)
     if (!userFromDB) {
         res.status(400).send({ message: "Invalid Credentials" })
         return
     }
     //password validate
       //password validate 
       const storedDbPassword = userFromDB.password
       const isPasswordMatch = await bcrypt.compare(password, storedDbPassword)
       if (!isPasswordMatch) {
           res.status(400).send({ message: "Invalid Credentials" })
           return
       }

       const token=jwt.sign({id:userFromDB._id},process.env.SECRET_KEY)
       res.send({ message: "Successful Login", token: token })
 });

export const usersRouter = router