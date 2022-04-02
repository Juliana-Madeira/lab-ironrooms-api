const { Schema, model } = require('mongoose');

const roomSchema = new Schema ({

    name: {
        type: String
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String
    },
    reviews: [],
},
    {timestamps: true }
); 

module.exports = model('Room', roomSchema);
