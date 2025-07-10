
# Content Genie Hub

Content Genie Hub is a dynamic platform that leverages AI (Gemini AI) to generate high-quality, context-aware content. It features a modern React frontend and a Node.js/Express backend, with secure Stripe payment integration and MongoDB for data storage.

---

## Project Structure

```
backend/               # Backend (Node.js/Express)
  ├── controllers/
  ├── db/
  ├── middleware/
  ├── models/
  ├── routes/
  ├── utils/
  ├── server.js
  ├── package.json
  └── frontend/        # Frontend (React)
      ├── src/
      ├── public/
      ├── package.json
      └── ...
```

---

## Tech Stack
- **Frontend:** React, Redux, TailwindCSS, Tanstack Query, Stripe API
- **Backend:** Node.js, Express, Mongoose (MongoDB)
- **AI Integration:** Gemini AI

---

## Features
- AI-powered content generation
- Modern, responsive UI
- Advanced data fetching (Tanstack Query)
- Secure Stripe payments

---

## Setup Instructions

### 1. Clone the Repository
```sh
git clone <your-repo-url>
cd backend
```

### 2. Install Dependencies

#### Backend
```sh
npm install
```

#### Frontend
```sh
cd frontend
npm install
```

### 3. Environment Variables

#### Backend (`backend/.env`):
```
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

#### Frontend (`backend/frontend/.env`):
```
REACT_APP_SERVER_URL=http://localhost:5000
REACT_APP_STRIPE_PUB_KEY=your_stripe_public_key
```

---

## Running the Project

### Start the Backend
From the `backend` directory:
```sh
npm run start
# or for development with auto-reload
npm run dev
```

### Start the Frontend
From the `backend/frontend` directory:
```sh
npm start
```

---

## Accessing the App
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## Demo Video
[Watch the demo](https://drive.google.com/file/d/1rOnV5lo5v3dKtXnnbWSC04AoNdL33U87/view?usp=drive_link)


