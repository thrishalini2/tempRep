const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServicesSchema = new Schema({
  title:           { type: String, required: true },
  description:     { type: String, required: true }, 
  pricePerHour:    { type: Number, required: true },
  hours:           { type: Number, required: true },
  tax:             { type: Number, required: false},
  imageLink:       { type: String, required: true },
  stock:           { type: Number , required: true},
  available:       { type: Number , required: true},
  toBeDispatched : { type: Number , requied : true},
  type:            { type: String , required: true}
});

module.exports = mongoose.model('Services', ServicesSchema);