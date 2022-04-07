const { Schema, model } = require('mongoose')


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required:true,
        unique:true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    },
    passwordHash: {
        type: String,
        required:true
    },
   
    room: [{
        type: Schema.Types.ObjectId,

    }]
    },
        {timestamps: true }
)

       
module.exports = model('User', userSchema);