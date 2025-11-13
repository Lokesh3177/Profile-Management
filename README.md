# 👤 Profile Management System – MERN Stack

A modern, full-stack Profile Management System built using the MERN architecture, featuring cloud image storage, a responsive UI, and complete CRUD functionality.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node](https://img.shields.io/badge/Node-v18+-brightgreen)
![React](https://img.shields.io/badge/React-v18+-61DAFB)

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

This system allows users to create, read, update and delete profile records with image upload support. The project follows professional coding standards and is suitable for production deployment.

**Live Demo:** [Add your demo link here]

## ✨ Key Features

### Core Functionality
- ✅ Create new profiles with image upload
- ✅ View all profiles in a responsive grid
- ✅ Edit and update profile details
- ✅ Delete existing profiles with confirmation

### UI & UX Features
- 🎨 Modern, responsive design with Tailwind CSS
- 🌈 Smooth transitions & gradient effects
- 📱 Mobile-first approach
- 🎯 Interactive navbar with dropdown menu
- ⚡ Fast loading with optimized images

### Storage & Backend
- ☁️ Cloud image storage (Cloudinary)
- 🗄️ MongoDB Atlas database
- 🔐 REST API with validation
- 🚀 Production-ready Node.js backend
- 📦 File upload handling with Multer

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

- **React.js** - UI library
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Vite** - Build tool

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB / Mongoose** - Database & ODM
- **Multer** - File upload handling
- **Cloudinary** - Image storage
- **dotenv** - Environment configuration
- **CORS** - Cross-origin resource sharing

## 🏗️ Architecture

```
┌─────────────────────┐
│  Frontend (React)   │
│    + Vite + Axios   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   REST API Layer    │
│    (Express.js)     │
└──────────┬──────────┘
           │
     ┌─────┴─────┐
     ▼           ▼
┌─────────┐  ┌──────────┐
│ MongoDB │  │Cloudinary│
│  Atlas  │  │ Storage  │
└─────────┘  └──────────┘
```

## 📁 Project Structure

```
Profile-Management/
│
├── Backend/
│   ├── models/
│   │   └── Profile.js          # Mongoose schema
│   ├── routes/
│   │   └── profileRoutes.js    # API routes
│   ├── middleware/
│   │   └── upload.js            # Multer config
│   ├── config/
│   │   └── cloudinary.js        # Cloudinary setup
│   ├── server.js                # Express server
│   ├── .env                     # Environment variables
│   ├── .gitignore
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
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── .env
│   ├── .gitignore
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB Atlas Account** - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Cloudinary Account** - [Sign up](https://cloudinary.com/)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/profile-management-system.git
cd profile-management-system
```

### 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../Frontend
npm install
```

## 🔐 Environment Variables

### Backend – `.env`

Create a `.env` file in the `Backend` directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/profileDB

# Cloudinary Configuration
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

# Security (Optional for future JWT implementation)
JWT_SECRET=your_jwt_secret_key_here
```

### Frontend – `.env`

Create a `.env` file in the `Frontend` directory:

```env
VITE_API_URL=http://localhost:3001
```

### 🔑 Getting Your Credentials

**MongoDB Atlas:**
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string from "Connect" → "Connect your application"

**Cloudinary:**
1. Sign up at [cloudinary.com](https://cloudinary.com/)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret

## 🏃 Running the Project

### Development Mode

**Terminal 1 - Backend:**
```bash
cd Backend
npm start
```
Server runs at: `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```
App runs at: `http://localhost:5173` (Vite default)

### Production Build

**Frontend:**
```bash
cd Frontend
npm run build
```

## 📡 API Documentation

### Base URL
```
http://localhost:3001/api/profiles
```

### Endpoints

#### 1. Create Profile
```http
POST /api/profiles
Content-Type: multipart/form-data

Body:
- name: String (required)
- email: String (required)
- phone: String (required)
- bio: String (optional)
- profileImage: File (required)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "bio": "Software Developer",
    "profileImage": "https://res.cloudinary.com/...",
    "createdAt": "2024-11-13T10:30:00.000Z",
    "updatedAt": "2024-11-13T10:30:00.000Z"
  }
}
```

#### 2. Get All Profiles
```http
GET /api/profiles
```

#### 3. Get Single Profile
```http
GET /api/profiles/:id
```

#### 4. Update Profile
```http
PUT /api/profiles/:id
Content-Type: multipart/form-data
```

#### 5. Delete Profile
```http
DELETE /api/profiles/:id
```

## 🗄️ Database Schema

### Profile Model

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ""
  },
  profileImage: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
4. Deploy

### Backend Deployment (Render)

1. Push code to GitHub
2. Create new Web Service on [Render](https://render.com)
3. Connect GitHub repository
4. Add environment variables (all from Backend `.env`)
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Deploy

**Important:** 
- Enable persistent disk for file uploads (if not using Cloudinary)
- Whitelist Render IP in MongoDB Atlas
- Update CORS origins in backend

### Alternative Deployment Options

- **Frontend:** Netlify, GitHub Pages, Firebase Hosting
- **Backend:** Railway, Heroku, AWS EC2, DigitalOcean

## 📸 Screenshots

> Add screenshots of your application here

```markdown
### Landing Page
![Landing Page](screenshots/landing.png)

### Profile Management
![Profile Management](screenshots/profiles.png)

### Create Profile
![Create Profile](screenshots/create.png)
```

## 🔮 Future Enhancements

- [ ] User authentication with JWT
- [ ] Search and filter profiles
- [ ] Pagination for large datasets
- [ ] Activity logs and audit trail
- [ ] Bulk import/export (CSV, Excel)
- [ ] Dark mode toggle
- [ ] Email notifications
- [ ] Profile sharing functionality
- [ ] Advanced role-based access control
- [ ] Real-time updates with WebSockets

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cloudinary](https://cloudinary.com/)
- [Express.js](https://expressjs.com/)

## 📞 Support

If you have any questions or need help, please:
- Open an issue in this repository
- Contact me at your.email@example.com

---

<div align="center">
  Made with ❤️ using MERN Stack
  
  ⭐ Star this repo if you find it helpful!
</div>
```