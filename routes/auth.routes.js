const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = Router();

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body
    try {        
        if(!username || !email || !password){
            throw new Error ('All fields are required')
        }

        const user = await User.findOne({email})
        if (user){
            throw new Error ('User already exists')
        }

        const salt = bcrypt.genSaltSync(12);
        const hash = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            username,
            email,
            passwordHash: hash
        })

        res.status(201).json( 'user created!'
        //     {
        //     username: newUser.name,
        //     email: newUser.email,
        //     rooms: newUser.rooms
        // }
        )

    } catch (error) {
        if(error.message === 'User already exists'){
            res.status(400).json({ msg: error.message})
        }
        res.status(500).json({ msg: error.message })
    }

});

router.post('/login', async (req, res) => {
        const { email, password } = req.body;
        try {
        
        const userFromDb = await User.findOne({email});
        if(!userFromDb){
            throw new Error('User not found')
        }

        const verifiedHash = bcrypt.compareSync(password, userFromDb.passwordHash);
        if(!verifiedHash){
            throw new Error('Email or Password invalid')
        }

        const payload = {
            id: userFromDb._id,
            username: userFromDb.username,
            email
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '2d'});

        res.status(200).json({user: payload, token});

    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})
 
module.exports = router;