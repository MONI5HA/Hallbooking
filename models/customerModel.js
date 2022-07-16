const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  CustomerName: {
    type: String,
    required: [true, "room name must be provided"],
    trim: true,
  },
  Slots: {
    type: Array,
    required: [true, "slots must be provided"],
  },
  price: {
    type: Number,
  },
  NumberOfSeats: {
    type: Number,
  },
});

const customerModel = mongoose.model("CustomerModel", customerSchema);

module.exports = customerModel;
