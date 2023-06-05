const mongoose = require("mongoose")
 
const connectToDB = ()=>{
   console.log("db");
   return  mongoose.connect("mongodb://127.0.0.1:27017/talks")
}
module.exports= connectToDB