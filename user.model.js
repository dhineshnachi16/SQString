const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require: true
    },
    role:["Admin", "User"]
})

const user = mongoose.Collection('user',userSchema)

module.exports= user