const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const multer = require('multer');


const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "profile-management",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    },
});

const upload = multer({ storage });

/*CREATE PROFILE*/
router.post('/', upload.single('profileImage'), async (req, res) => {

    console.log("REQ BODY --->", req.body);
    console.log("REQ FILE --->", req.file);

    try {
        const { name, email, phone, bio } = req.body;


        const existing = await Profile.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newProfile = new Profile({
            name,
            email,
            phone,
            bio: bio || "",
            profileImage: req.file ? req.file.path : null,  // Cloudinary link
        });

        const saved = await newProfile.save();

        res.status(201).json({
            message: "Profile created successfully",
            data: saved,
        });

    } catch (err) {
        console.error("Error creating profile:", err);
        res.status(500).json({
            message: "Error creating profile",
            error: err.message
        });
    }
});

/* GET ALL PROFILES*/
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: "Profiles fetched successfully",
            data: profiles,
        });

    } catch (err) {
        console.error("Fetch error:", err);
        res.status(500).json({
            message: "Error fetching profiles",
            error: err.message
        });
    }
});

/* GET SINGLE PROFILE */
router.get('/:id', async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);

        if (!profile)
            return res.status(404).json({ message: "Profile not found" });

        res.status(200).json({
            message: "Profile fetched successfully",
            data: profile,
        });

    } catch (err) {
        res.status(500).json({
            message: "Error fetching profile",
            error: err.message
        });
    }
});

/* UPDATE PROFILE */
router.put('/:id', upload.single('profileImage'), async (req, res) => {

    console.log("REQ BODY --->", req.body);
    console.log("REQ FILE --->", req.file);

    try {
        const { name, email, phone, bio } = req.body;

        const existing = await Profile.findOne({
            email,
            _id: { $ne: req.params.id }
        });

        if (existing) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const updateData = {
            name,
            email,
            phone,
            bio: bio || "",
            updatedAt: Date.now(),
        };

        
        if (req.file) {
            updateData.profileImage = req.file.path;
        }

        const updatedProfile = await Profile.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedProfile)
            return res.status(404).json({ message: "Profile not found" });

        res.status(200).json({
            message: "Profile updated successfully",
            data: updatedProfile,
        });

    } catch (err) {
        res.status(500).json({
            message: "Error updating profile",
            error: err.message
        });
    }
});

/*
    DELETE PROFILE*/

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Profile.findByIdAndDelete(req.params.id);

        if (!deleted)
            return res.status(404).json({ message: "Profile not found" });

        res.status(200).json({
            message: "Profile deleted successfully",
            data: deleted
        });

    } catch (err) {
        res.status(500).json({
            message: "Error deleting profile",
            error: err.message
        });
    }
});

module.exports = router;
