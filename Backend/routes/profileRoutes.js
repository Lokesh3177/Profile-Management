const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// CREATE - Add a new profile
router.post('/', upload.single('profileImage'), async (req, res) => {
    try {
        const { name, email, phone, bio } = req.body;

        // Check if profile already exists
        const existingProfile = await Profile.findOne({ email });
        if (existingProfile) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newProfile = new Profile({
            name,
            email,
            phone,
            bio: bio || '',
            profileImage: req.file ? `/uploads/${req.file.filename}` : null,
        });

        const savedProfile = await newProfile.save();
        res.status(201).json({
            message: 'Profile created successfully',
            data: savedProfile,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating profile', error: error.message });
    }
});

// READ - Get all profiles
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: 'Profiles fetched successfully',
            data: profiles,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profiles', error: error.message });
    }
});

// READ - Get single profile by ID
router.get('/:id', async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({
            message: 'Profile fetched successfully',
            data: profile,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
});

// UPDATE - Update a profile
router.put('/:id', upload.single('profileImage'), async (req, res) => {
    try {
        const { name, email, phone, bio } = req.body;

        // Check if email is being changed and if it already exists
        if (email) {
            const existingProfile = await Profile.findOne({
                email,
                _id: { $ne: req.params.id },
            });
            if (existingProfile) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }

        const updateData = {
            name,
            email,
            phone,
            bio: bio || '',
            updatedAt: Date.now(),
        };

        if (req.file) {
            updateData.profileImage = `/uploads/${req.file.filename}`;
        }

        const updatedProfile = await Profile.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            data: updatedProfile,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});

// DELETE - Delete a profile
router.delete('/:id', async (req, res) => {
    try {
        const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
        if (!deletedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({
            message: 'Profile deleted successfully',
            data: deletedProfile,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting profile', error: error.message });
    }
});

module.exports = router;
