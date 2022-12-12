const mongoose = require("mongoose")

let Userschema = mongoose.Schema({
    email:String,
    password:String,
    ipaddress:String
    
})

const Usermodel = mongoose.model("users",Userschema)


module.exports={Usermodel}
