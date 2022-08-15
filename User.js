import express, { Router } from "express";
const router=express.Router();
import {client} from "./index.js";
import { ObjectId } from "mongodb";
import {auth} from "./auth.js";
router.get("/:id",auth,async function(req,res){
  const id =req.params; 
  const result =await client.db("Todo").collection("user")
  .findOne({_id:ObjectId(id)});
    res.send(result);
})

router.get("/home",auth,async function(req,res){
   //const =req.params;
      const result =await client.db("Todo").collection("user")
        .findOne({});
      res.status(200).json({username:result.username,id:result._id});
    //res.send(re);
})


export const UserRouter=router;

