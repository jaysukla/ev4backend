const express = require("express")
const {connection} = require("./config/db")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const app = express()
const {Usermodel} = require("./models/usermodel")
const {todorout} = require("./router/todo.route")
app.use(express.json())

app.post("/signup",async (req,res)=>{
let {email,password,ipaddress} = req.body

bcrypt.hash(password, 4, async function(err, hash) {
   
await Usermodel.insertMany([{email,password:hash,ipaddress}])

res.send("signup success")


});


})

app.post("/login",async(req,res)=>{
let {email,password,ipaddress} = req.body
let data= await Usermodel.find({email})
let hash= data[0].password

bcrypt.compare(password, hash,  function(err, result) {
  
    if (result){
        var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
res.send({"msg":"login successfull ","token":token})

        
    }else{
        res.send("please login")
    }



});


})


app.use((req,res,next)=>{
let token= req.headers.token
    jwt.verify(token, 'shhhhh', function(err, decoded) {
    
        if (decoded){
            next()
        }else{
            res.send("please login ")
        }

        

      });
      

})


app.use("/todos",todorout)

app.listen(1300,()=>{
    try {
        connection;
        console.log("db connection success")
    } catch (error) {
        console.log("err from db connection ")
        console.log(error)
    }
    console.log("listning to port 1300")
})





//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2NzA4MzY2MDV9.Ga9JohY1-xwD2Ghpt_QZWMcSfm5wz_cGlByHvuWgxlo