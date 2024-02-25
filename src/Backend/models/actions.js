const mongoose = require("mongoose");
//const mongoosePaginate = require("mongoose-paginate-v2");
//const mongoosePaginateAggregate = require("mongoose-aggregate-paginate-v2");
const StorageScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      require: true,
    },
    sumary: {
      type: String,
      require: true,
    },
    monitoring: [{
      id: {
        type: String,
        require: true
      },
      name: {
        type: String,
        require: true
      }
    }],
    date: [{
      type: String,
      require: true
    }],
    worker: {
      id: {
        type: String,
        require: true
      },
      name: {
        type: String,
        require: true
      }
    },
  },


  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.models.Actions || mongoose.model("Actions", StorageScheme);