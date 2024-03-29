const mongoose = require("mongoose");
//const mongoosePaginate = require("mongoose-paginate-v2");
//const mongoosePaginateAggregate = require("mongoose-aggregate-paginate-v2");
const StorageScheme = new mongoose.Schema(
  {
    plate: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    ownerName: {
      type: String,
      require: true,
    },
    dniOwner: {
      type: Number,

    },
    year: {
      type: Number,
      require: true
    },
    km: {
      type: Number,
    },
    actionsId: [{
      type: String,
    }],
    monitoring: [{
      id:{
        type: String},
      ult:{
        type: String},
    }],
    lastmaintenance: {
      date: {
        type: String,
      },
      Textdate: {
        type: String,
      },
    },
    Nextmaintenance: {
      date: {
        type: String,
      },
      Textdate: {
        type: String,
      },
    },
    type: {
      id: {
        type: String,
        require: true,
      },
      name: {
        type: String,
        require: true,
      },
    },


    },


  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.models.Vehicle || mongoose.model("Vehicle", StorageScheme);