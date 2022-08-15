import express, { Router } from "express";
const router=express.Router();
import {client} from "./index.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {auth} from './auth.js';
import { ObjectId } from "mongodb";
app.post("/register", async function (req, res) {
    try {
      // Open the Connection

  
      // Select the DB
      const db = await client.db("b35wd_tamil");
  
      // Select the Collection
      const salt = await bcryptjs.genSalt(10);
      const hash = await bcryptjs.hash(req.body.password, salt);
      req.body.password = hash;
      await db.collection("users").insertOne(req.body);
  
      // Close the connection
      await connection.close();
  
      res.json({
        message: "Successfully Registered",
      });
    } catch (error) {
      res.json({
        message: "Error",
      });
    }
  });
  
  app.post("/login", async function (req, res) {
    try {
      // Open the Connection
  
      // Select the DB
      const db = await client.db("b35wd_tamil");
  
      // Select the Collection
      const user = await db
        .collection("users")
        .findOne({ username: req.body.username });
  
      if (user) {
        const match = await bcryptjs.compare(req.body.password, user.password);
        if (match) {
          // Token
          const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: "1m" });
          res.json({
            message: "Successfully Logged In",
            token,
          });
        } else {
          res.status(401).json({
            message: "Password is incorrect",
          });
        }
      } else {
        res.status(401).json({
          message: "User not found",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
 


export const AuthRouter=router;