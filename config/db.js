const mongoose = require("mongoose")

require('dotenv').config()
let Url= process.env.mongo_url
const connection = mongoose.connect(Url)


module.exports = {
    connection
}
