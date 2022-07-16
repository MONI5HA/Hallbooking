const express = require("express");

const bookController = require("../controller/bookController");

const router = express.Router();

router.route("/create").post(bookController.createRoom);
router.route("/rooms").get(bookController.getAllCustomers);

router
  .route("/")
  .post(bookController.bookRoom)
  .get(bookController.getAllBookedRoom);

module.exports = router;
