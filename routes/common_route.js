

const express = require('express');
const router = express.Router();
const Products = require('../models/products/products_model');
const Services = require('../models/services/services_model')
const Orders = require('../models/orders/orders_model')
// const { connectMongoDB, getDatabase, closeMongoDB } = require("../services/mongodb_connection");


router.get('/all', async (req, res) => {
  try{
   const products =  await Products.find()
   const services = await Services.find()
   const combined = [...products, ...services];
   res.status(200).json(combined)
  }
  catch{
    res.status(500).json({"messsage":"Something went wrong. oops!"});
  }
})

router.get('/orders',async(req,res)=>{
  
  try{
    const orders = await Orders.find()
    res.status(200).json(orders)
  }
  catch{
    res.status(500).json({"messsage":"Something went wrong. oops!"});
  }

})



module.exports = router;
