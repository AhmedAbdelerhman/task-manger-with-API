const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    email:{
        type:String,
        trim:true,
        require:true
    },
    password :{

        type:String,
        trim:true,
        require:true
    },

    resetToken:{
        type:String,
        default:""
    },
    resetTokenExpiration:Date
})

module.exports = mongoose.model("user", userSchema)