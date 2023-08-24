const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  title:           { type: String , required: true },
  description:     { type: String , required: true }, 
  price:           { type: Number , required: true },
  tax:             { type: Number , required: false},
  imageLink:       { type: String , required: true },
  stock:           { type: Number , required: true},
  available:       { type: Number , required: true},
  toBeDispatched:  { type: Number , requied : true},
  type:            { type: String , required: true}
});



module.exports = mongoose.model('Products', productsSchema);

