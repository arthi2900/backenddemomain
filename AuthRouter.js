import express, { Router } from "express";
const router=express.Router();
import {client} from "./index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {auth} from './auth.js';
import { ObjectId } from "mongodb";

async function genPassword(password){
    const salt=await bcrypt.genSalt(10);
    const hashpassword=await bcrypt.hash(password,salt);
  //  console.log({salt,hashpassword});
    return hashpassword;
    }
router.post("/register",async function (req,res){
    const {username,password,email}=req.body;
    const hashpassword=await genPassword(password);
    const newUser={
        username:username,email:email,password:hashpassword,
    }
const result=await client.db("Todo").collection("user")
.insertOne(newUser);
res.send(result);
   })
router.post("/login",async function(req,res){
    const{username,password}=req.body;
      const userfromdb=await client.db("Todo").collection("user").findOne({username:username});
        console.log(userfromdb);
    if(!userfromdb) 
    {
        res.status(401).send({message:"invalid credentials"});
       }
   else {
    const storedPassword=userfromdb.password;
    const isPasswordMatch=await bcrypt.compare(password,storedPassword);
    console.log("isPasswordMatch",isPasswordMatch);
if(isPasswordMatch){
const token=jwt.sign({id:userfromdb._id},process.env.SECRET_KEY);
const user=username;
const id=userfromdb._id;
const newUser1={
  username:username,email:email,password:hashpassword,token:token,id:_id
}
const userfromdb1=await client.db("Todo").collection("usermain").insertOne(newUser1);;
console.log(userfromdb1);       
console.log(userfromdb);
res.send({message:"successful login",token:token,user:user,id:id});
//res.send(userstoretoken);
}
else{
res.status(401).send({message:"Invalid credenitials"});
}
   }
 })
 router.get("/logout",auth,async function  (req, res) {
    try{
        res.localStorage.removeItem('token')
        console.log("successfull logout");
          }
 catch(error){
 res.status(500).send('error');
 }
  
    
    
});
 export const AuthRouter=router;
