//const http=require("http")
//const gfName=require("./featurs")
//import http from "http"
//import gfName from "./featurs.js";
// import { generateParcent } from "./featurs.js";
// import fs from "fs"

//console.log(generateParcent());
//const app=http.createServer((req,res)=>{

//     if(req.url=="/about"){
//         res.end(`<h1>Love is - ${generateParcent()}</h1>`);
//     }else if(req.url=="/"){

//         fs.readFile("./index.html",(err,data)=>{
//             res.end(data);
//         })

//     }else if(req.url=="/contact"){
//         res.end("<h1>Contact Page</h1>");
//     }else{
//         res.end("<h1>Page Not Found</h1>");
//     }
// })

// app.listen(5000,()=>{
//     console.log("App is running on port 5000");
// })

//   Express

import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"

const app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

//Creating Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

//Creating Model
const User = mongoose.model("User", userSchema);

// app.get("/",(req,res)=>{
//     res.send("Hello")
// })

// app.get("/",(req,res)=>{
//     res.sendStatus(404)
// })

// app.get("/",(req,res)=>{
//     res.sendStatus(500)
// })

// app.get("/getProducts",(req,res)=>{
//     res.json({
//         success:true,
//         products:[]
//     })
// })

//Using middlewares
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");

const isAuthenticated = (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    const decoded=jwt.verify(token,"asdygflawdihfo@dewf")
    console.log(decoded);
    next();
  } else {
    res.render("login");
  }
};

app.get("/", isAuthenticated, (req, res) => {
  res.render("logout");
});

app.post("/login", async(req, res) => {
  const {name,email}=req.body 

  const user=await User.create({
    name,email
  })

const token=jwt.sign({_id:user._id}, "asdygflawdihfo@dewf")

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

app.get("/add", async (req, res) => {
  await Message.create({
    name: "Sabir",
    email: "sabir@gmail.com",
  });
  res.send("Data added");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
