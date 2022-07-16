const bookingModel = require("../models/bookModel");

exports.createRoom = async (req, res) => {
  try {
    const body = req.body;

    if (!body) {
      res.status(400).json({
        status: "failure",
        msg: "body is missing",
      });
    }
    const newRoom = await bookingModel.create(req.body);

    res.status(200).json({
      status: "success",

      RoomDetails: newRoom,
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      msg: err,
    });
  }
};

exports.bookRoom = async (req, res) => {
  try {
    const { roomID, CustomerName, Date, slot } = req.body;

    const selectedRoom = await bookingModel.findById(roomID);

    const updatedRoom = { ...selectedRoom._doc };

    let bookedStatus;
    updatedRoom.availableSlots.forEach((item) => {
      if (item.slot === slot) {
        bookedStatus = item.bookedStatus;
      }
    });

    if (!bookedStatus) {
      updatedRoom.availableSlots.forEach((item) => {
        if (item.slot === slot) {
          if (!item.bookedStatus) {
            (item.bookedStatus = true),
              (item.customerName = CustomerName),
              (item.bookedDate = Date);
          }
        }
      });

      const roomWithBookedDetails = await bookingModel.findByIdAndUpdate(
        roomID,
        updatedRoom,
        {
          new: true,
        }
      );

      // console.log(updatedRoom);

      res.status(200).json({
        status: "success",
        msg: roomWithBookedDetails,
      });
    } else {
      return res.status(400).json({
        status: "failure",
        msg: "Slot already taken",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failure",
      msg: "book room",
    });
  }
};

exports.getAllBookedRoom = async (req, res) => {
  try {
    const allRooms = await bookingModel.find();

    // console.log(allRooms);

    const bookedRooms = allRooms
      .map((item) => item._doc)
      .map((item) => item.availableSlots)
      .flat()
      .filter((item) => item.bookedStatus === true);

    res.status(200).json({
      status: "success",
      data: {
        bookedRooms,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const allRooms = await bookingModel.find();

    // console.log(allRooms);

    const bookedRooms = allRooms
      .map((item) => item._doc)
      .map((item) => item.availableSlots)
      .flat()
      .filter((item) => item.bookedStatus === true);

    res.status(200).json({
      status: "success",
      data: {
        customerDetails: bookedRooms,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
