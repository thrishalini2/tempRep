const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId:    { type: Schema.Types.ObjectId, ref: 'User' },
  itemId:    { type: Schema.Types.ObjectId, required: true },
  quantity:  { type: Number , required: true},
  paymentId: { type: String , required: false},
});

module.exports = mongoose.model('Order', OrderSchema);
