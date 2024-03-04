const express = require("express");
const User = require("./model/userSchema");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ Email: email });

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Compare the password provided with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.Password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // If email and password match, user is authenticated
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error(`Error logging in: `, error.message);
        res.status(500).send(`Internal server error`);
    }
});

module.exports = router;

//getting data from database
// let storedData = null; // Global variable to store data
// let rec_bookName = null;
// let rec_authName = null;
// let rec_stuName = null;
// let rec_stuId = null;
// let rec_date = null;

// app.get("/checkName", async (req, res) => {
//     try {
//         storedData = await schemaModel.findOne(); // Set the global variable
//         if (storedData) {
//             // Extract data and store in separate variables
//             rec_bookName = storedData.bookName;
//             rec_authName = storedData.authName;
//             rec_stuName = storedData.stuName;
//             rec_stuId = storedData.stuId;
//             rec_date = storedData.data;

//             res.status(200).send(
//                 Bookname: ${rec_bookName}, authorname: ${rec_authName}, studentname: ${rec_stuName}, id: ${rec_stuId}, date: ${rec_date}
//             );
//         } else {
//             res.status(404).send("Not found");
//         }
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

// app.delete("/deleteData", async (req, res) => {
//     try {
//         const result = await schemaModel.deleteOne();

//         if (result.deletedCount > 0) {
//             res.status(200).send("First data item deleted successfully");
//         } else {
//             res.status(404).send("No data found to delete");
//         }
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });
