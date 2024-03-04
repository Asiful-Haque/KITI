const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./model/userSchema");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { fname, lname, address, email, password } = req.body;

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            FirstName: fname,
            LastName: lname,
            Address: address,
            Email: email,
            Password: hashedPassword,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error(`Error registering user: `, error.message);
        res.status(500).send(`Internal server error`);
    }
});

module.exports = router;
