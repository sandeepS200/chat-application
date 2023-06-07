const mongoose = require("mongoose")
const connectToDB = ()=>{
   return  mongoose.connect("mongodb+srv://unity8758:6oS2K1wDiyJ5Bfbp@cluster0.ty2tb38.mongodb.net/talks?retryWrites=true&w=majority",{
      useNewUrlParser:true,
      useUnifiedTopology:true
   })
}
module.exports= connectToDB