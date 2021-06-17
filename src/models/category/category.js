'use strict';

const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: { type: String, required: true, uppercase: true },
  description: { type: String, required: true },
});

const categoryModel = mongoose.model('categories', categorySchema);

module.exports = categoryModel;
