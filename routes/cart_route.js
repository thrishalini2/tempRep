

const express = require('express');
const router = express.Router();
const Products = require('../models/products/products_model');
const Services = require('../models/services/services_model');
const Cart = require('../models/cart/cart_model');
const Orders = require('../models/orders/orders_model');
// const { connectMongoDB, getDatabase, closeMongoDB } = require("../services/mongodb_connection");

// const services = new Services({
//     "title":    "Electrician",
//     "description":    "Repairs household electric shorts", 
//     "pricePerHour":      300,
//     "imageLink":     "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fpaper-box&psig=AOvVaw1eKwVEbRhmJET_AwUGqCQf&ust=1692872613403000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCNCDmYjI8oADFQAAAAAdAAAAABAE",
//     "stock":          500,
//     "available":       40,
//     "toBeDispatched" : 10
// })
// services.save()
// console.log(services)

// let totalBill = 0;

// async function calculateBill(userId) {
//     try {
//       const items =  await Cart.find({userId : userId})
//       let totalAmount = 0;
//       for (const item of items) {
//         if(item.price)
//         totalAmount += item.price;
//         else
//         totalAmount += item.pricePerHour * item.hours;
//       }
  
//       return totalAmount;
//     } catch (error) {
//       throw new Error('Error calculating bill: ' + error.message);
//     }
//   }

// totalBill = calculateBill;

router.get('/:userId', async (req, res) => {
    try{
        const {userId} = req.params;
        const cart =  await Cart.find({userId : userId})
        //    const services = await Services.find()
        //    res.append(products)
        //    res.append(services)
        res.status(200).json(cart);
    }
    catch{
        res.status(500).json({"messsage":"Something went wrong. oops!"});
    }

})


router.post('/:userId/add',async(req,res)=>{
    try{
        const {userId} = req.params;
        const {itemId , quantity} = req.body;
        const product = await Products.findById(itemId)
        // console.log(product.available , quantity)
        if (product && product.available >= quantity){
            const NewCartItem = new Cart({ userId: userId, itemId: itemId, quantity: quantity });            // console.log(NewCartItem)
            await NewCartItem.save();
            res.status(200).json({ message: 'Added to cart Successfully', product });
        }
        else{
            const service = await Services.findById(itemId)
            if(service && service.available >=quantity){
                const NewCartItem = new Cart ({ userId : userId , itemId : itemId , quantity : quantity});

                NewCartItem.save();
                res.status(200).send({message: "Added to cart Successfully", service})
            }
            else{
                res.status(404).send({"message": "The given cannot be added due to unavailability"})
            }
        }
    }
    catch{
        res.status(500).send({"message":"An Error occured while adding to the cart"})
    }

})

router.patch('/:userId/update',async(req,res)=>{
    try{
        const {userId} =req.params;
        const {itemId , quantity} = req.body;
        const filter = { userId: userId, itemId: itemId };
        const update = { quantity: quantity };
        console.log(5)
        const updatedCart = await Cart.findOneAndUpdate(filter, update, { new: true });
        console.log(updatedCart)
        if (updatedCart) {
          res.status(200).json( { message: 'Cart item updated successfully', updatedCart});
        } else {
          res.status(404).json({ message: 'Cart item not found' });
        }
     
    }
    catch{
        res.status(500).send({"message":"An Error occured while updating quantity for item in the cart"})
    }

})

router.patch('/:userId/remove',async(req,res)=>{
    const {userId} = req.params;
    const {itemId} = req.body;
    try {
        const result = await Cart.deleteMany({ userId: userId, itemId: itemId });
    
        if (result.deletedCount > 0) {
          res.status(200).json({ message: 'Items removed from the cart successfully' });
        } else {
          res.status(404).json({ message: 'No items found to remove from the cart' });
        }
      } catch (error) {
        // console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while removing items from the cart' });
      }
})

router.patch('/:userId/empty', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const result = await Cart.deleteMany({ userId: userId });
  
      if (result.deletedCount > 0) {
        res.status(200).json({ message: 'Cart emptied successfully' });
      } else {
        res.status(404).json({ message: 'No items found in the cart to empty' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred while emptying the cart' });
    }
  });
  
router.get('/:userId/totalBill', async (req, res) => {
    try{
        const { userId } = req.params;
        const cartItems = await Cart.find({userId : userId})
        let totalAmount = 0;
        let totalTax = 0;
        let totalQuantity = 0;
        let billItems = [];

        for (let cart of cartItems){

            let product = await Products.findById(cart.itemId)
            // console.log(product)
            if (product ){
                // console.log(product)
                // product = {...product , tax : 0};
                
                if(product.price>1000 && product.price<=5000)
                { 
                    product.tax = product.price * 0.12 + 200;
                    product.price += product.tax;
                    totalTax+=product.tax*cart.quantity ;
                    totalAmount+=product.price*cart.quantity;
                    totalQuantity+=cart.quantity;

                    billItems.push(product);
                }
                else if(product.price>5000){
                    product.tax = product.price * 0.18 + 200;
                    product.price += product.tax;
                    totalTax+=product.tax*cart.quantity;
                    totalAmount+=product.price*cart.quantity;
                    totalQuantity+=cart.quantity;
                    
                    billItems.push(product);

                }
                else if(product.price <=1000){
                    product.tax = 200;
                    product.price += product.tax;
                    totalTax+=product.tax*cart.quantity;
                    totalAmount+=product.price*cart.quantity;
                    totalQuantity+=cart.quantity;
                    // console.dir(product)
                    billItems.push(product);
                }
                // console.log(billItems)
            }
            else{
                const service = await Services.findById(cart.itemId)
                if(service ){
                    // service = {...service , tax : 0};
                    if((service.pricePerHour * service.hours)>1000 && (service.pricePerHour * service.hours)<=8000)
                    { 
                        service.tax = service.pricePerHour * service.hours * 0.1 + 100;
                        service.price += service.tax;
                        totalTax+=service.tax*cart.quantity ;
                        totalAmount+=service.price*cart.quantity;
                        totalQuantity+=cart.quantity;
                        
                        billItems.push(service);
                        
                    }
                    else if((service.pricePerHour*service.hour)>8000){
                        service.tax = service.pricePerHour * service.hours * 0.15 + 100;
                        service.price += service.tax;
                        totalTax+=service.tax*cart.quantity ;
                        totalAmount+=service.price*cart.quantity;
                        totalQuantity+=cart.quantity;
    
                        billItems.push(service);
                    }
                    else if((service.pricePerHour*service.hour)<=1000){
                        service.tax = 100;
                        service.price += service.tax;
                        totalTax+=service.tax*cart.quantity ;
                        totalAmount+=service.price*cart.quantity;
                        totalQuantity+=cart.quantity;
    
                        billItems.push(service);
    
                    }
                    
                    
                }
            }

            
        }
        // console.log(billItems)
        res.status(200).json({ 
            billItems: billItems,
            totalTax: totalTax,
            totalQuantity: totalQuantity,
            totalAmount: totalAmount
          });
          

        // return totalAmount;
      } catch (error) {
        console.log(error)
        res.status(500).send({"messsage":"Something went wrong. oops!"});
      }

})

router.get('/:userId/conformOrder', async (req, res) => {
try{
    const { userId } = req.params;
    const cartItems = await Cart.find({ userId: userId });
    for(let items of cartItems){
        const product = await Products.findByIdAndUpdate(items.itemId,{ $inc: { available: -items.quantity , toBeDispatched:items.quantity} }, { new: true })
        // console.log(product)
        if (!product){
            const service = await Services.findByIdAndUpdate(items.itemId,{ $inc: { available: -items.quantity , toBeDispatched:items.quantity} }, { new: true })
          
        }
    }
    // console.log(cartItems)
    const ordersToInsert = cartItems.map(cartItem => ({
      userId: cartItem.userId,  
      itemId: cartItem.itemId,
      quantity: cartItem.quantity,
    }));
    // console.log(ordersToInsert)
    const insertedOrders = await Orders.insertMany(ordersToInsert);
    await Cart.deleteMany({userId:userId});
    res.status(200).json({ message: "Order has been confirmed",insertedOrders});
}
catch(error){
    console.log(error)
    res.status(500).json({message:"An error occured while conforming order"})
}

})

module.exports = router;
