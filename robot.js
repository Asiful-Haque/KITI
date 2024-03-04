const express = require("express");
const robotSchemaModel = require("./model/robotSchema");

const router = express.Router();

router.post("/addRobot", async (req, res) => {
    try {
        const { name, description, date, createdBy } = req.body;

        // Create a new user instance
        const newRobot = new robotSchemaModel({
            Name: name,
            Description: description,
            BuildDate: date,
            CreatedBy: createdBy,
        });

        // Save the user to the database
        const savedRobot = await newRobot.save();

        res.status(201).json(savedRobot);
    } catch (error) {
        console.error(`Error registering user: `, error.message);
        res.status(500).send(`Internal server error`);
    }
});


router.put("/updateRobot", async (req, res) => {
    const { name, updatedName, updatedDescription, updatedDate, updatedCreatedBy } = req.body;

    try {
        const robot = await robotSchemaModel.findOne({ Name: name });

        if (!robot) {
            return res.status(404).send("Robot not found");
        }

        // Update the robot
        robot.Name = updatedName;
        robot.Description = updatedDescription;
        robot.Date = updatedDate;
        robot.CreatedBy = updatedCreatedBy;

        const updatedRobot = await robot.save();

        res.status(200).json({ message: "Robot updated successfully", updatedRobot });
    } catch (error) {
        console.error(`Error updating robot item: `, error.message);
        res.status(500).send(`Internal server error`);
    }
});

router.delete("/deleteRobot", async (req, res) => {
    const { name } = req.body;

    try {
        // Find the robot item by name
        const robot = await robotSchemaModel.findOne({ Name: name });

        if (!robot) {
            return res.status(404).send("Robot not found");
        }

        // Delete the robot item
        await robotSchemaModel.deleteOne({ Name: name });

        res.status(200).json({ message: "Robot item deleted", deletedRobot: robot });
    } catch (error) {
        console.error(`Error deleting robot item: `, error.message);
        res.status(500).send(`Internal server error`);
    }
});

module.exports = router; 