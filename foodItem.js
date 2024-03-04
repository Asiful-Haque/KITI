const express = require("express");
const foodSchemaModel = require("./model/foodSchema");

const router = express.Router();

router.post("/addFoodItem", async (req, res) => {
    try {
        const { name, description, price } = req.body;

        // Create a new user instance
        const newFood = new foodSchemaModel({
            Name: name,
            Description: description,
            Price: price,
        });

        // Save the user to the database
        const savedFood = await newFood.save();

        res.status(201).json(savedFood);
    } catch (error) {
        console.error(`Error registering user: `, error.message);
        res.status(500).send(`Internal server error`);
    }
});

router.post("/getFoodItem", async (req, res) => {
    const { name } = req.body;

    try {
        // Find food by name
        const food = await foodSchemaModel.findOne({ Name: name });

        if (!food) {
            return res.status(404).send("Food not found");
        }

        // If email and password match, user is authenticated
        res.status(200).json({ message: "Food found", food });
    } catch (error) {
        console.error(`Error logging in: `, error.message);
        res.status(500).send(`Internal server error`);
    }
});


router.put("/updateFoodItem", async (req, res) => {
    const { name, updatedName, updatedDescription, updatedPrice } = req.body;

    try {
        const food = await foodSchemaModel.findOne({ Name: name });

        if (!food) {
            return res.status(404).send("Food not found");
        }

        // Update the food 
        food.Name = updatedName;
        food.Description = updatedDescription;
        food.Price = updatedPrice;

        const updatedFood = await food.save();

        res.status(200).json({ message: "Food updated successfully", updatedFood });
    } catch (error) {
        console.error(`Error updating food item: `, error.message);
        res.status(500).send(`Internal server error`);
    }
});

router.delete("/deleteFoodItem", async (req, res) => {
    const { name } = req.body;

    try {
        // Find the food item by name
        const food = await foodSchemaModel.findOne({ Name: name });

        if (!food) {
            return res.status(404).send("Food not found");
        }

        // Delete the food item
        await foodSchemaModel.deleteOne({ Name: name });

        res.status(200).json({ message: "Food item deleted", deletedFood: food });
    } catch (error) {
        console.error(`Error deleting food item: `, error.message);
        res.status(500).send(`Internal server error`);
    }
});



module.exports = router; 