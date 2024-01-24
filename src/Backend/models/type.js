const mongoose = require("mongoose");
//const mongoosePaginate = require("mongoose-paginate-v2");
//const mongoosePaginateAggregate = require("mongoose-aggregate-paginate-v2");
const StorageScheme = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    brand: {
      type: String,
      required: true,
    },
    cars: [{
      id: {
        type: String,
        require: true,
      },
      plate: {
        type: String,
        require: true,
      },
    }],
    monitoringId: [{
        type: String,
        require: true,
      }],
  },


  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.models.Type || mongoose.model("Type", StorageScheme);