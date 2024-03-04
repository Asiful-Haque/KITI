const express = require("express");
const feedbackSchemaModel = require("./model/feedbackSchema");

const router = express.Router();

router.post("/addFeedback", async (req, res) => {
    try {
        const { name, feedback, status } = req.body;

        // Create a new feedback instance
        const newFeedback = new feedbackSchemaModel({
            Name: name,
            Feedback: feedback,
            Status: status,
        });

        // Save the feedback to the database
        const savedFeedback = await newFeedback.save();

        res.status(201).json(savedFeedback);
    } catch (error) {
        console.error(`Error taking feedback: `, error.message);
        res.status(500).send(`Internal server error`);
    }
});

router.post("/getFeedback", async (req, res) => {
    const { name } = req.body;

    try {
        // Find feedback by name
        const feedback = await feedbackSchemaModel.findOne({ Name: name });

        if (!feedback) {
            return res.status(404).send("Feedback not found");
        }

        // If email and password match, user is authenticated
        res.status(200).json({ message: "Feedback found", feedback });
    } catch (error) {
        console.error(`Error in getting feedback: `, error.message);
        res.status(500).send(`Internal server error`);
    }
});

router.put("/updateFeedback", async (req, res) => {
    const { name, updatedName, updatedFeedback, updatedStatus } = req.body;

    try {
        const feedback = await feedbackSchemaModel.findOne({ Name: name });

        if (!feedback) {
            return res.status(404).send("Food not found");
        }

        // Update the food
        feedback.Name = updatedName;
        feedback.Feedback = updatedFeedback;
        feedback.Status = updatedStatus;

        const updatedFeedback = await feedback.save();

        res.status(200).json({ message: "Food updated successfully", updatedFeedback });
    } catch (error) {
        console.error(`Error updating feedback item: `, error.message);
        res.status(500).send(`Internal server error`);
    }
});

router.delete("/deleteFeedback", async (req, res) => {
    const { name } = req.body;

    try {
        // Find the feedback item by name
        const feedback = await feedbackSchemaModel.findOne({ Name: name });

        if (!feedback) {
            return res.status(404).send("Feedback not found");
        }

        // Delete the feedback item
        await feedbackSchemaModel.deleteOne({ Name: name });

        res.status(200).json({ message: "Feedback item deleted", deletedFeedback: feedback });
    } catch (error) {
        console.error(`Error deleting feedback item: `, error.message);
        res.status(500).send(`Internal server error`);
    }
});

module.exports = router;
