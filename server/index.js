require("dotenv").config();

const express = require("express");
const app = express();
const database = require("./database");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const router = require('./routes/index');
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler)

app.get("/", (req, res) => {
  res.status(200).json({ message: "works" });
});

const start = async (req, res) => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
