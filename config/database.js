const mongoose = require("mongoose")
require("dotenv").config()
const connectToDB = ()=>{
   return  mongoose.connect(process.env.MONGODB_URL,{
      useNewUrlParser:true,
      useUnifiedTopology:true
   })
}
module.exports= connectToDB