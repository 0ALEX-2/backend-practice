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

const app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

  //Creating Schema
  const messageSchma=new mongoose.Schema({
    name:String,
    email:String 
  })

  //Creating Model
const Message=mongoose.model("Message",messageSchma)



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



app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { name: "Sahani" });
});

// app.get("/add", (req, res) => {
//     Message.create({name:"Shakil",email:"sakil@gmail.com"}).then(()=>{
//         res.send("Nice");
//     })
//});

app.get("/add",async(req,res)=>{
    await Message.create({
        name:"Sabir",
        email:"sabir@gmail.com"
    })
    res.send("Data added")
})

app.get("/success", (req, res) => {
  res.render("success");
});
app.get("/users", (req, res) => {
  res.json({
    users,
  });
});

app.post("/contact",async(req, res) => {
  const {name,email}=req.body 

  await Message.create({name, email})
  res.redirect("/success");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
