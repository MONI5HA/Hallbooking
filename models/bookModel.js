const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: [true, "room name must be provided"],
    trim: true,
  },
  availableSlots: [
    {
      slot: String,
      bookedStatus: Boolean,
      customerName: String,
      bookedDate: String,
    },
  ],
  price: {
    type: Number,
  },
  NumberOfSeats: {
    type: Number,
  },
  Amenties: {
    type: Array,
  },
});

const bookingModel = mongoose.model("BookingModel", bookingSchema);

module.exports = bookingModel;
