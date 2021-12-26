const express=require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app=express();
app.use(express.json());
const db= require('./database');
const Todo=require('./Todo');

  

app.get('/',(req,res)=>{
    res.json('get is working')
});  

app.get('/test',(req,res)=>{
    Todo.find({},(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.json(data)
        }
    })

});
app.post('/test',(req,res)=>{
    Todo.create(req.body,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.json(data)
      };
    });
});

app.delete('/test/:id',(req,res)=>{
    Todo.deleteOne({_id: req.params.id},(err,deleteObj)=>{
        if(err){
            console.log("error",err)
        }else{
            deleteObj.deleteCount === 1 
            ? res.json('delete one task by id')
            : res.json('this task is not found')
        }
    });
});

app.put('/test/:id',(req,res)=>{
    Todo.updateOne({_id: req.params.id},
        {title: req.body.newTitle},(err,updateObj)=>{
        if(err){
            console.log("error",err)
        }else{
            updateObj.modifiedCount === 1 
            ? res.json('update one task by id')
            : res.status(404).json('this task is not found')
        }
    });
});

app.get('/filter',(req,res)=>{
    Todo.find({isCompleted: req.query.isCompleted}, (err,data)=>{
      if(err){
         console.log('ERROR',err)
      }else{
         res.json(data)
      }
    })
})

app.delete('/test',(req,res)=>{
    Todo.deleteMany({isCompleted: true },(err,deleteObj)=>{
        if(err){
            console.log("error",err)
        }else{
            deleteObj.deletedCount === 0
            ? res.json('completed no found')
            : res.json('delete all completed')
        }
    });
});

app.put('/test/:id/:isCompleted',(req,res)=>{
    Todo.updateOne({_id: req.params.id},
        {isCompleted: req.params.isCompleted},(err,updateObj)=>{
        if(err){
            console.log("error",err)
        }else{
            updateObj.modifiedCount === 1 
            ? res.json('update one task successfully')
            : res.status(404).json('this task is not found')
        }
    });
});

app.listen(4000,()=>{
    console.log('SERVER IS WORKING')
})