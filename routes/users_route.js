

const express = require('express');
const router = express.Router();
const User = require('../models/users/users_model');
const UserValidation = require('../models/users/users_validation');
const jwt = require('jsonwebtoken');
// const { connectMongoDB, getDatabase, closeMongoDB } = require("../services/mongodb_connection");

const maxAge = 2*24*60*60;

const createToken = (id)=>{
  return jwt.sign({id},"super secret key",{
    expiresIn : maxAge,
  })
}

router.post('/register', async (req, res) => {
    try {
        // user = new User({'email': 'th', 'password': '676'});

        const {name, email, phoneNumber , password , conformPassword} = req.body ;
        const userFound = await User.find({email : email})
        // console.log(userFound.length);
        if(userFound.length == 0){
        if(password ==conformPassword)
        {
        // const validatedData = UserValidation.parse(req.body);

        // console.log(validatedData);
        user = new User({'email': email, 'password': password , 'name' : name , 'phoneNumber' : phoneNumber , 'password' : User.encryptPassword(password) });
        const token = createToken(user._id);
        await user.save();
        res.cookie("jwt",token,{
          withCredentials:true,
          httpOnly:false,
          maxAge : maxAge*1000,
        });
        res.status(201).json({user:user._id,'message' : "registeration successful"});
        }
        else{
            res.status(500).json({'message' :"Passwords dont match"})
        }
    }
    else{
        res.status(500).json({'message' :"User already exists with id"})
    }
      } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ 'message': 'An error occurred while saving the user.' });
      }
      
});

router.get('/login',async(req,res)=>{
    try{
        const {email , password} = req.body ;
        const userFound = await User.findOne({ email: email });
        console.log(userFound)
        if (!userFound || !User.validPassword(userFound ,password)) {
          res.status(401).json({ 'message': 'Authentication failed' });
        } 
        else {
          res.status(200).json({ 'message': 'Authentication successful' });
        }

    }
    catch(error){
        res.status(500).json({ 'message': 'An error occurred while logging in.' });
    }
}
)
// router.use(closeMongoDB);

module.exports = router;
