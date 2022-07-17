const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductsSchema = new Schema({
  title: { type: String, require: true },
  price: { type: Number, require: true },
  img: { type: String, require: true },
  description: { type: String}
});


mongoose.model('productos', ProductsSchema);

module.exports = mongoose.model('productos', ProductsSchema);