const express = require("express");
const bookRouter = require("./routes/bookRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/booking", bookRouter);

module.exports = app;
