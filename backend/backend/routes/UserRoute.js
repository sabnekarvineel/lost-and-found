const express = require("express");
const userModel = require("../models/usermodel");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const router = express.Router();



// Set up storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Folder to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

// Multer upload middleware
const upload = multer({ storage: storage });

// Static folder for serving uploaded files
router.use('/uploads', express.static(path.join(__dirname, "../uploads")));

// POST route for lost items


router.post(
    "/lost",
    upload.fields([
        { name: "itemPhoto", maxCount: 1 }, // Field for object image
        { name: "locationPhoto", maxCount: 1 }, // Field for location image
    ]),
    async (req, res) => {
        const { objectType, lostDate, specificLocation, contactNumber, description, type } = req.body;

        try {
            const userAdded = await userModel.create({
                objectType,
                itemPhoto: req.files?.itemPhoto ? req.files.itemPhoto[0].path : null, // Save item photo path
                locationPhoto: req.files?.locationPhoto ? req.files.locationPhoto[0].path : null, // Save location photo path
                lostDate,
                specificLocation,
                contactNumber,
                description,
                type: type || 'lost',
            });
            res.status(201).json(userAdded);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

// POST route for found items


router.post(
    "/found",
    upload.fields([
        { name: "itemPhoto", maxCount: 1 },
        { name: "locationPhoto", maxCount: 1 },
    ]),
    async (req, res) => {
        const { objectType, foundDate, specificLocation, contactNumber, description, type } = req.body;

        try {
            const userAdded = await userModel.create({
                objectType,
                itemPhoto: req.files?.itemPhoto ? req.files.itemPhoto[0].path : null,
                locationPhoto: req.files?.locationPhoto ? req.files.locationPhoto[0].path : null,
                foundDate,
                specificLocation,
                contactNumber,
                description,
                type: type || 'found', // Default to 'found'
            });
            res.status(201).json(userAdded);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);


// GET route for all items
router.get("/", async (req, res) => {
    try {
        const allItems = await userModel.find();
        res.status(200).json(allItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// GET route for only lost items
router.get("/lost", async (req, res) => {
    try {
        const lostItems = await userModel.find({ type: 'lost' });
        res.status(200).json(lostItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET route for only found items
router.get("/found", async (req, res) => {
    try {
        const foundItems = await userModel.find({ type: 'found' });
        res.status(200).json(foundItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET route for a single item by ID
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const singleItem = await userModel.findById(id);
        res.status(200).json(singleItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE route for an item by ID
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedItem = await userModel.findByIdAndDelete(id);
        res.status(200).json(deletedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PATCH route for updating an item by ID
router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const updatedItem = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
