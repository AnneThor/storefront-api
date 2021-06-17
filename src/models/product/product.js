'use strict';

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, uppercase: true, enum: ['FOOD', 'HOUSEWARES', 'OUTDOORS'] },
});

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;
