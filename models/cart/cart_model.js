const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId:   { type: Schema.Types.ObjectId, ref: 'User',required: true },
  itemId:   { type: Schema.Types.ObjectId,required: true },
  quantity: { type: Number , required : true}
  // address: { type: String, required: true },
  // name: { type: String, required: true },
  // paymentId: { type: String, required: true },
});

module.exports = mongoose.model('Cart', CartSchema);
