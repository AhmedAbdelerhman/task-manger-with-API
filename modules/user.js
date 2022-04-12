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
    }
})

module.exports = mongoose.model("user", userSchema)