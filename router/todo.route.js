const  express = require("express")
const mongoose = require("mongoose")

let todoschema= mongoose.Schema({
    taskname:String,
status:String,
tag:String,
id:String
})

const Todomodel =  mongoose.model("todos",todoschema)

let todorout= express.Router()



todorout.get("/",async(req,res)=>{

 let data = await Todomodel.find()

 res.send(data)

    
})

todorout.get("/todos",async(req,res)=>{
let query = req.query
 
let data = await Todomodel.find(query)
res.send(data)

})


todorout.get("/todos/:todoID",async(req,res)=>{
let query = req.params.todoID

let data= await Todomodel.find({id:query})

res.send(data)



})


todorout.post("/create",async(req,res)=>{
let paylode= req.body





await Todomodel.insertMany([paylode])
res.send("created")



})

todorout.put("/update/:todoID",async(req,res)=>{
    let query = req.params.todoID
let data= req.body
    await Todomodel.findByIdAndUpdate({_id:query},data)
res.send("Updated")
// console.log(query)

})


todorout.delete("/delete/:todoID",async(req,res)=>{
    let query = req.params.todoID
await Todomodel.findByIdAndDelete({_id:query})
res.send("deleted")
})


module.exports= {todorout}

