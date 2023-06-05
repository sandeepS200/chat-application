const mongoose = require("mongoose")
// here structure of active user

const activeStructure = mongoose.Schema({
    activeName:{
        type:String,
        required:true
    },
    activeEmail:{
        type:String,
        unique:true,
        required:true
    },
    activePassword:{
        type:String,
        min :[8,"please Enter your password atleast >= 8"]
    },
    activeMbNO:{
        type:Number,
        min:[10,"this number is not accept"],
        max:[10,"this number is not accept"]
    },
    contactList:[],
    chatList:[]
})

// now here export this active Structure

module.exports= mongoose.model("User",activeStructure);