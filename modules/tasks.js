const mongoose = require('mongoose')
const schema = mongoose.Schema

const TaskSchema = schema({


    name:{
        type:String,
        require:[true , "must be entered"],
        trim:true
        
    },

    completed :{
        type: Boolean,
        default:false
    }
})

module.exports = mongoose.model("task", TaskSchema)