const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const jwt = require("jsonwebtoken");


const connectDB = require("./db/connect");
const PORT = 5000 || process.env.PORT

const corsOptions = {
    // origin: process.env.ALLOWED_CLIENTS.split(',')
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

app.use(express.json());
app.use(cors(corsOptions));


app.get("/test", (req, res) => {
    res.json({"test": "passed"})
})




// user API's 
const auth = require("./routes/Auth")

app.use("/api/v1/auth", auth)


// product API's

const product = require("./routes/Product");
app.use("/api/v1/product", product);


// Comment API's

const comment = require("./routes/Comment");
app.use("/api/v1/comment", comment)


// Rating API's

const rating = require("./routes/Rating");
app.use("/api/v1/rating", rating)


// Cart API's

const cart = require("./routes/Cart");
app.use("/api/v1/cart", cart);










const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(PORT, () =>
        console.log(`Server is listening on port ${PORT}...`)
      );
    } catch (error) {
      console.log(error);
    }
};
start();