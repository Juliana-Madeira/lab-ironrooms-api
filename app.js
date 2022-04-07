require('dotenv').config();
const express = require ('express');
const connectDB = require('./config/db.config.js');
const cors = require('cors');
const bcrypt = require('bcryptjs');


connectDB();

const app = express(); 

//middlewares gerais
app.use(express.json());
app.use(cors());

//rotas publicas
app.use('/auth', require('./routes/auth.routes.js')); //rota pública

//middleware token (de rotas)
app.use(require('./middlewares/auth.middleware.js'));

app.use('/rooms', require('./routes/rooms.routes.js'));
app.use('/reviews', require('./routes/reviews.routes.js'));


app.listen(process.env.PORT, () => console.log(`server running on port: ${process.env.PORT}`));