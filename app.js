const express = require("express");
const connectDB = require("./db"); // Import database connection function
const registerRouter = require("./registration");
const loginRouter = require("./login");
const foodItemRouter = require("./foodItem");
const robotRouter = require("./robot");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 8005;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(registerRouter);
app.use(loginRouter);
app.use(foodItemRouter);
app.use(robotRouter);


app.get("/",(req,res) => {
    res.send("Hello");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
