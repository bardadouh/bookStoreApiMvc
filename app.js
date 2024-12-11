const connectToDB = require("./config/db");
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errors");
const dotenv = require("dotenv").config();
connectToDB();
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

const express = require("express");

//Init App
const app = express();

// static folder
app.use(express.static(path.join(__dirname, "images")));

// Apply Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// helmet
// app.use(helmet({
//   origin: "http://localhost:3000"
// }));
app.use(cors());

// cors
app.use(cors());

// Set View Engine
app.set("view engine", "ejs");

// Routes
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/user"));
app.use("/api/upload", require("./routes/upload"));
app.use("/password", require("./routes/password"));

//Error Handler
app.use(notFound);
app.use(errorHandler);

//runing server
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
);
