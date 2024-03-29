const mongoose = require("mongoose");
//const mongoosePaginate = require("mongoose-paginate-v2");
//const mongoosePaginateAggregate = require("mongoose-aggregate-paginate-v2");
const StorageScheme = new mongoose.Schema(
  {
    name:{
      type: String,
      require: true,
    },
    review: [{
      type: {
        type: String,
        require: true,
      },
      ciclic: {
        type: Number,
        require: true,
      },
      minValue: {
        type: Number,
        require: true,
      },
      Value: {
        type: Number,
        require: true,
      },
    }],

    },


  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.models.Monitoring || mongoose.model("Monitoring", StorageScheme);