'use strict';

// Accepts a schema and provides methods to interact with the schema 

class DataCollection {

  constructor(model) {
    this.model = model;
  }

  get(_id) {
    if (_id) {
      return this.model.findOne({ _id });
    }
    else {
      return this.model.find({});
    }
  }

  async create(record) {
    try {
      let newRecord = new this.model(record);
      let savedRecord = await newRecord.save();
      return savedRecord;
    } catch (error) {
      throw new Error({message: "invalid inputs"})
    }

  }

  update(_id, record) {
    return this.model.findByIdAndUpdate(_id, record, { new: true });
  }

  delete(_id) {
    return this.model.findByIdAndDelete(_id);
  }

}

module.exports = DataCollection;
