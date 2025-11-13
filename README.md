Profile Management System – MERN Stack

A modern, full-stack Profile Management System built using the MERN architecture, featuring cloud image storage, a responsive UI, and complete CRUD functionality.


▣ Table of Contents

Overview

Key Features

Tech Stack

Architecture

Project Structure

API Documentation

Environment Variables

Installation

Running the Project

Database Schema

Deployment Notes

Future Enhancements

License

▣ Overview

This system allows users to create, read, update and delete profile records with image upload support.
The project follows professional coding standards and is suitable for production deployment.

▣ Key Features
◆ Core Functionality

✓ Create new profiles

✓ View all profiles

✓ Edit and update profile details

✓ Delete existing profiles

◆ UI & UX Features

✓ Responsive layout

✓ Modern Tailwind CSS design

✓ Smooth transitions & gradients

✓ Interactive navbar dropdown

◆ Storage & Backend

✓ Cloud image storage (Cloudinary)

✓ MongoDB Atlas database

✓ REST API with validation

✓ Production-ready Node.js backend


▣ Tech Stack
Frontend

React.js

Axios

Tailwind CSS

Vite

Backend

Node.js

Express.js

MongoDB / Mongoose

Multer + Cloudinary

dotenv

CORS


▣ Architecture
Frontend (React + Vite)
        │
        ▼
REST API (Express.js)
        │
        ▼
MongoDB Atlas (Profile Data)
        │
        ▼
Cloudinary (Image Storage)

▣ Project Structure
Profile Management/
│
├── Backend/
│   ├── models/
│   │   └── Profile.js
│   ├── routes/
│   │   └── profileRoutes.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProfileDropdown.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   └── ProfileManagement.jsx
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── public/
│   └── package.json

▣ API Documentation
▶ Create Profile
POST /api/profiles


Body (multipart/form-data):

name

email

phone

bio

profileImage (file)

▶ Get All Profiles
GET /api/profiles

▶ Get Single Profile
GET /api/profiles/:id

▶ Update Profile
PUT /api/profiles/:id

▶ Delete Profile
DELETE /api/profiles/:id

▣ Environment Variables
Backend – .env
MONGODB_URI=your_mongo_url
PORT=3001
NODE_ENV=production

CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloud_key
CLOUD_API_SECRET=your_cloud_secret

JWT_SECRET=your_secret_key

▣ Installation
Backend
cd Backend
npm install

Frontend
cd Frontend
npm install

▣ Running the Project
Backend
npm start


Runs at: http://localhost:3001

Frontend
npm run dev


Runs at: http://localhost:3000

▣ Database Schema
{
  name: String,
  email: String,
  phone: String,
  bio: String,
  profileImage: String,
  createdAt: Date,
  updatedAt: Date
}

▣ Deployment Notes
Frontend Deployment (Vercel)

Add environment variable:

VITE_API_URL = https://your-backend-url.onrender.com

Backend Deployment (Render)

Add all environment variables

Enable file uploads

Allow Cloudinary network access

▣ Future Enhancements

User authentication (JWT)

Search & Filters

Pagination

Activity logs

Bulk import/export

Dark mode