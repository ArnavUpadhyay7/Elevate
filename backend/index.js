const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const playerRouter = require("./routes/player.route");
const coachRouter = require("./routes/coach.route");
const blogRouter = require("./routes/blog.route");
const paymentRouter = require("./routes/payment.route");

const path = require("path");

const connectToDb = require("./db/db");
connectToDb();

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: process.env.NODE_ENV === "production" 
    ? ["https://elevate-xqw2.onrender.com/"]
    : "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy' });
});

app.use("/player", playerRouter);
app.use("/coach", coachRouter);
app.use("/blog", blogRouter);
app.use("/payment", paymentRouter);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

app.listen(port, '0.0.0.0', ()=> {
    console.log(`Server is listening on port: ${port}`);
});