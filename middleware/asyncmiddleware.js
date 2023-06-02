const asyncWrapper = (fn)=>{
return 5
}

const print = asyncWrapper(()=>{
    console.log("heoowlkd")
})
module.exports = asyncWrapper

// higher oreder functions


 
const home = (fn)=>{
    return fn
}
const template = home(()=>{
    return 4;
})
console.log(template())







