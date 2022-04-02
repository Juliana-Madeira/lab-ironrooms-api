const express = require ('express');
const connectDB = require('./config/db.config.js');
const cors = require('cors');


connectDB();

const app = express(); 
app.use(express.json());

app.use(cors());


app.use(require('./middlewares/auth.middleware.js'));



app.listen(process.env.PORT, () => console.log(`server running on port: ${process.env.PORT}`));