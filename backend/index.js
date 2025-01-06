const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectToDb = require("./db/db");
connectToDb();

const app = express();
const port = process.env.PORT || 4000;

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    console.log("Server started");
})

app.listen(port, ()=> {
    console.log(`Server is listening on port: ${port}`);
});