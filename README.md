# Profile Management System - MERN Stack

A full-stack Profile Management application built with the latest MERN (MongoDB, Express, React, Node.js) stack with complete CRUD operations.

## Features

✅ **Create Profiles** - Add new profiles with name, email, phone, bio, and profile image
✅ **Read Profiles** - View all profiles on the landing page
✅ **Update Profiles** - Edit existing profiles with file upload support
✅ **Delete Profiles** - Remove profiles with confirmation
✅ **Profile Dropdown** - Top navbar shows selected profile with contact info
✅ **Image Upload** - Support for profile picture uploads
✅ **Responsive Design** - Works seamlessly on desktop and mobile devices
✅ **Modern UI** - Beautiful gradient design with smooth animations

## Tech Stack

### Backend
- **Node.js & Express.js** - RESTful API server
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### Frontend
- **React 18.2** - UI library
- **Axios** - HTTP client
- **React Router v6** - Client-side routing
- **CSS3** - Styling with gradients and animations

## Project Structure

```
Profile Management/
├── Backend/
│   ├── models/
│   │   └── Profile.js          # MongoDB schema
│   ├── routes/
│   │   └── profileRoutes.js    # API endpoints
│   ├── server.js                # Express server
│   ├── .env                     # Environment variables
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js       # Navigation bar with profile dropdown
│   │   │   └── ProfileDropdown.js  # Profile dropdown menu
│   │   ├── pages/
│   │   │   ├── LandingPage.js     # Profile list & selection
│   │   │   └── ProfileManagement.js # CRUD operations
│   │   ├── App.js              # Main component
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   └── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## Installation & Setup

### 1. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the Backend folder:
```
MONGODB_URI=mongodb://localhost:27017/profile_management
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_this
```

**For MongoDB Atlas (Cloud):**
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/profile_management
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_this
```

Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd Frontend
npm install
```

Start the frontend development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## API Endpoints

### Create Profile
```
POST /api/profiles
Content-Type: multipart/form-data

Body:
- name (required)
- email (required, unique)
- phone (required)
- bio (optional)
- profileImage (optional, file)
```

### Get All Profiles
```
GET /api/profiles
```

### Get Single Profile
```
GET /api/profiles/:id
```

### Update Profile
```
PUT /api/profiles/:id
Content-Type: multipart/form-data

Body:
- name
- email
- phone
- bio
- profileImage (optional)
```

### Delete Profile
```
DELETE /api/profiles/:id
```

## Usage

1. **Landing Page**: View all available profiles
2. **Create Profile**: Click "Create New Profile" button
3. **Fill Form**: Enter name, email, phone, optional bio and image
4. **Select Profile**: Click "Select Profile" to set as current profile
5. **View Profile**: Selected profile appears in top-right navbar
6. **Edit Profile**: Click "Edit Profile" in the dropdown menu
7. **Delete Profile**: Remove profiles from the management page

## Features Breakdown

### Navbar Profile Section
- Displays selected profile's avatar, name, and contact info
- Dropdown menu with quick access to profile details
- Edit and logout options
- Responsive design

### Landing Page
- Grid view of all profiles
- Quick profile selection
- Create new profile button
- Visual profile cards with images

### Profile Management Page
- Full CRUD interface
- Form for creating/editing profiles
- File upload for profile pictures
- List of all profiles with action buttons
- Success/error messages

## File Upload Handling

Profile images are stored on the server in the `uploads/` directory. Ensure proper permissions for the server to write files.

## Database Schema

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  phone: String (required),
  profileImage: String (file path),
  bio: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Customization

### Change Colors
Edit the gradient colors in CSS files:
- Primary: `#667eea` → change to your color
- Secondary: `#764ba2` → change to your color

### Database Configuration
Update the `MONGODB_URI` in `.env` file to connect to your MongoDB instance

### Port Configuration
Modify the `PORT` in `.env` (Backend) and proxy in Frontend `package.json`

## Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running
- Check your connection string in `.env`
- Verify network access if using MongoDB Atlas

### "CORS Error"
- Verify backend is running on port 5000
- Check proxy in Frontend `package.json`

### "Image upload not working"
- Ensure `uploads/` directory exists in Backend
- Check file permissions
- Verify multer configuration

## Performance Optimizations

- Images are stored as file paths (can be migrated to cloud storage like S3)
- Pagination can be added to profile list
- Lazy loading for images
- Debouncing for form inputs

## Future Enhancements

- User authentication (JWT)
- Profile search and filtering
- Sorting options
- Export profiles to CSV/PDF
- Profile sharing
- Activity logs
- Image optimization and cloud storage

## License

MIT License

## Support

For issues or questions, please check the documentation or create an issue.

---

**Created with ❤️ using MERN Stack**
