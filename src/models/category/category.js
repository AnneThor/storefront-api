'use strict';

const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: { type: String, required: true, uppercase: true, enum: ['FOOD', 'HOUSEWARES', 'OUTDOORS'] },
  totalProducts: { type: Number, required: true, default: 0 },
});

const categoryModel = mongoose.model('categories', categorySchema);

module.exports = categoryModel;
