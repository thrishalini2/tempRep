const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
// const { connectMongoDB, getDatabase, closeMongoDB } = require("../../services/mongodb_connection");
const express = require('express');
// const router = express.Router();

// router.use(connectMongoDB);

const userSchema = new Schema({
  name:        { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email:       { type: String, required: true },
  password:    { type: String, required: true },
  address:     { type: String, required: false },
  paymentId:   { type : String , required : false}
});


userSchema.statics.encryptPassword =  (password)=>{
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};


userSchema.statics.validPassword =  (user , password)=>{
  // console.log(password);
  return bcrypt.compareSync(password, user.password);

};

// const User = mongoose.model('User', userSchema)

// async function  w () {
//   let database = await getDatabase();
//   await database.createCollection('users', User);
// }

// w()


// router.use(closeMongoDB);
module.exports = mongoose.model('User', userSchema);
