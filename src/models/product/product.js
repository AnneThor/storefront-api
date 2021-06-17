'use strict';

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  inventory: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, uppercase: true },
});

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;
