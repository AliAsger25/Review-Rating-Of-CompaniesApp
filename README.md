# ReviewHub - Company Review and Rating Platform

A full-stack web application that enables users to review and rate companies, built with Node.js/Express backend and React TypeScript frontend.

## Features

- 🔐 User Authentication (Register/Login)
- 🏢 Company Management (Create, View, List)
- ⭐ Review and Rating System
- 📱 Responsive Design
- 🎨 Professional UI/UX
- 🔍 Company Search
- 📊 Dashboard Analytics

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- Winston for logging
- Joi for validation
- BCrypt for password hashing

### Frontend
- React 18 with TypeScript
- React Router for navigation
- Axios for API calls
- Professional CSS with CSS Variables
- Responsive Design

## Project Structure

```
review_rating/
├── backend/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── validations/
│   └── index.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the project root:
```bash
cd review_rating
```

2. Install backend dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/review_rating
JWT_SECRET=your_jwt_secret_key_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

4. Start MongoDB service:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
net start MongoDB
```

5. Start the backend server:
```bash
npm start
```

The backend will run on http://localhost:3001

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install frontend dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on http://localhost:3000

## API Endpoints

### Authentication
- `POST /user/create` - Register new user
- `POST /user/login` - User login
- `POST /user/sendmail` - Send password reset email
- `POST /user/userpasswordreset/:id/:token` - Reset password

### Companies
- `POST /company/createcompany` - Create new company (authenticated)
- `GET /company/listcompany` - List all companies
- `GET /company/companydetails/:id` - Get company details
- `GET /company/searchcompany/:letter` - Search companies
- `GET /company/sortcompany` - Sort companies

### Reviews
- `POST /review/createreview` - Create review
- `PATCH /review/updatereview/:id` - Update review
- `DELETE /review/deletereview/:id` - Delete review
- `GET /review/listreviews` - List all reviews

## Features Overview

### User Management
- User registration with profile picture upload
- Secure authentication with JWT
- Password reset functionality
- User dashboard

### Company Management
- Add new companies with details
- View company profiles
- Search and filter companies
- Company listings with professional cards

### Review System
- Rate companies (1-5 stars)
- Write detailed reviews
- View all reviews for companies
- Review management (CRUD operations)

### Professional UI
- Modern, clean design
- Responsive layout
- Professional color scheme
- Smooth animations and transitions
- Loading states and error handling

## Color Scheme

The application uses a professional blue-based color palette:
- Primary: #2563eb (Blue)
- Secondary: #64748b (Slate Gray)
- Success: #10b981 (Emerald)
- Warning: #f59e0b (Amber)
- Error: #ef4444 (Red)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


