require('dotenv').config();
const mongoose = require('mongoose');


const connectDB = async () => {
    try{
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected to mongo: ${connection.connections[0].name}`);
    } catch (error) {
        console.log('error connecting to db');
    }
}

module.exports = connectDB;