import express, { Router } from "express";
const router=express.Router();
import {client} from "./index.js";
import { ObjectId } from "mongodb";
import {auth} from "./auth.js";
/*router.get("/",auth,async function(req,res){
    const result =await client.db("Todo").collection("user")
    .find({}).toArray();
    res.send(result);
})
*/
router.get("/",auth,async function(req,res){
   //const =req.params;
      const result =await client.db("Todo").collection("user")
        .findOne({});
       const re=res.status(200).json({username:result.username});
    res.send(re);
})


export const UserRouter=router;

