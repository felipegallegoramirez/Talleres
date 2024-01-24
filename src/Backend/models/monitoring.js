const mongoose = require("mongoose");
//const mongoosePaginate = require("mongoose-paginate-v2");
//const mongoosePaginateAggregate = require("mongoose-aggregate-paginate-v2");
const StorageScheme = new mongoose.Schema(
  {
    review: [{
      type: {
        type: String,
        require: true,
      },
      ciclic: {
        type: Boolean,
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

module.exports = mongoose.models.Users || mongoose.model("Users", StorageScheme);