const express = require("express");
const app = express();
const port = 7000;
const path = require("path");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const cookieParser = require("cookie-parser");
const { checkAuthentication, restrictTo } = require("./middlewares/auth");

//routes
const userRoute = require("./routes/user");
const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");

//ejs setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
//acceps json response
app.use(express.json());
//accepts form data
app.use(express.urlencoded({ extended: false }));
//use cookie
app.use(cookieParser());
app.use(checkAuthentication);

//route
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/", staticRouter);
app.use("/user", userRoute);

//database connection
connectToMongoDB("mongodb://127.0.0.1:27017/URLdatabaseMain").then(() =>
  console.log("MongoDb connnected successfully")
);

//server
app.listen(port, () => {
  console.log(`sever created at port ${port} successfully`);
});
