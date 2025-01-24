const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
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
const __dirname = path.resolve();

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

// Remove this route later
app.get("/", (req, res) => {
    res.send("ELEVATE");
})

app.listen(port, ()=> {
    console.log(`Server is listening on port: ${port}`);
});