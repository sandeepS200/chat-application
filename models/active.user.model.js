const mongoose = require("mongoose")
// here structure of active user

const activeStructure = mongoose.Schema({
    activeName:String,
    activeEmail:String,
    activePassword:String,
    activeMbNO:String,
    contactList:[],
    chatList:[]
})

// now here export this active Structure

module.exports= mongoose.model("users",activeStructure);