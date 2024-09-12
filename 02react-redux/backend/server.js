const express=require("express");
const {connect,Schema,model}=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");


const corsOptions = {
    origin: 'http://localhost:5173', // frontend URL
    optionsSuccessStatus: 200, // some legacy browsers choke on 204
  };
const app=express();
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Mongodb connection
connect("mongodb://localhost:27017/redux")

const Todo=model("todo",new Schema({title:String,completed:Boolean}));

// Create TODO 
app.post('/api/todos',async(req,res)=>{
   
    
    const todo=new Todo({
        title:req.body.title,
        completed:false
    })
    await todo.save();
    res.json(todo);
})


// Read TODO
app.get("/api/todos",async(asyncreq,res)=>{
     const todo=await Todo.find();
     res.json(todo);
})

// update TODO
app.put("/api/todos/:id",async(req,res)=>{
    console.log("UPDATE");
    
    const {id}=req.params;
    const {title,completed}=req.body;
    console.log(id,title,completed);
    
    const todo=await Todo.findByIdAndUpdate(
        id,
        {title,completed},
        {new:true}
    );
    console.log(todo);
    
    res.json(todo)
})

// delete TODO
app.delete("/api/todos/:id",async(req,res)=>{
    const {id}=req.params;
    await Todo.findByIdAndDelete(id);
    res.json({id});
})

app.listen(8000,()=>console.log(`Server is Running  !`));