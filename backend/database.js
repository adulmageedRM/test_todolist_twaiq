const mongoose=require('mongoose')

const dbURI= "mongodb://localhost:27017/TodolistTEST";


mongoose.connect(dbURI)    

const db = mongoose.connection;

db.on("error",(err)=>{
    console.log('ERROR in mongodb');
});

db.on("connected", (err)=>{
    console.log("mongodb is CONNECTED");
});

