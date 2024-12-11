const connectToDB = require("./config/db");
const logger = require("./middlewares/logger");
const { notFound, errorHandler} = require("./middlewares/errors");
const dotenv = require("dotenv").config();

connectToDB();

const express = require("express");

//Init App
const app = express();

// Apply Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger);

app.set('view engine', 'ejs');

// Routes
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/user"));
app.use("/password", require("./routes/password"));


//Error Handler
app.use(notFound);
app.use(errorHandler);

//runing server
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server is running in${process.env.NODE_ENV} on port ${PORT}`)
);
