
# Content Genie Hub

Welcome to Content Genie Hub, a dynamic platform designed to transform your content creation process through the power of artificial intelligence. This application leverages Gemini AI to offer users a versatile and innovative tool for generating content across various domains. Whether you need inspiration, specific information, or creative content, Content Genie Hub simplifies the process, delivering tailored outputs directly to you.

## Tech Stack

**Client:** React, Redux, TailwindCSS, Tanstack Query, StripeAPI

**Server:** Node, Express, Mongoose for MongoDB interactions

**AI Integration:** Gemini AI for state-of-the-art content generation capabilities


## Features

- ***AI Content Generation:*** Utilizes Gemini AI to provide high-quality, context-aware content generation.
- ***Modern User Interface:*** Built with ReactJS and styled with TailwindCSS, offering a responsive and intuitive user experience.
- ___Advanced Data Fetching:___ Implements Tanstack Query (formerly React Query) for efficient, asynchronous data fetching and state management.
- ___Secure Payments:___ Integrated with Stripe Elements to ensure safe and reliable payment processing for premium features.






## Project Setup


### Client-Side
Project Setup Locally in VSCode Terminal

```
  git clone https://github.com/ritikrajg/AI-Content-Generator-frontend
  cd .\AI-Content-Generator-frontend\
  npm install
```
### Server-Side
Project Setup Locally in VSCode Terminal

```
  git clone https://github.com/ritikrajg/AI-Content-Generator-backend
  cd .\AI-Content-Generator-backend\
  npm install
```
or

Download the zip file, Unzip it, open with VSCode and Run below code in terminal

```
  npm install
```


    
## Run Locally

Go to the project directory - Install dependencies 

___Frontend___
```
  npm start
```
___Backend___

```
  npm run server
```

## Environment Variables
Frontend:

`REACT_APP_SERVER_URL` 
`REACT_APP_STRIPE_PUB_KEY` 

Backend:

`NODE_ENV`
`PORT`
`MONGODB_URI`
`JWT_SECRET`
`FRONTEND_URL`
`GEMINI_API_KEY`
`STRIPE_SECRET_KEY`

## Deployment on Render

1. **Push your code to GitHub.**
2. **Create a new Web Service on [Render](https://render.com/):**
   - Connect your repository.
   - Set the root directory to your backend folder if needed.
   - **Build Command:**
     ```
     npm install && npm run build
     ```
   - **Start Command:**
     ```
     npm start
     ```
   - **Environment Variables:**
     - `NODE_ENV=production`
     - `PORT` (Render sets this automatically)
     - `MONGODB_URI` (your MongoDB Atlas connection string)
     - `JWT_SECRET` (your JWT secret)
     - `FRONTEND_URL` (your Render domain, e.g., https://your-app.onrender.com)
     - `GEMINI_API_KEY` (your Gemini API key)
     - `STRIPE_SECRET_KEY` (your Stripe secret key)
     - `REACT_APP_STRIPE_PUB_KEY` (your Stripe publishable key)

3. **Your backend will serve the frontend build and API.**

---

## Stripe Integration Troubleshooting
- For local development, Stripe.js works over HTTP but will warn you. In production, HTTPS is required.
- If you see 401 errors from Stripe, check:
  - Your backend is using the correct Stripe secret key.
  - Your frontend is using the correct publishable key.
  - Never expose your secret key in the frontend.

---

## Content Security Policy (CSP) and Manifest
- The backend uses Helmet with a custom CSP to allow Stripe.js.
- The manifest link was removed from `index.html` to avoid browser errors since no manifest.json is present.
- If you add a manifest in the future, restore the link in `index.html`.

## Demo Video


[![Watch the video](https://github.com/ritikrajg/AI-Content-Generator-frontend/assets/126319130/2117f43d-5c43-4b5a-8b63-ea0e6ebd191e)](https://drive.google.com/file/d/1_fsF-dQeCqb9P70mrBJTGDE40x_DqF4G/view?usp=sharing)



## Screenshots

![Homepage](https://github.com/jameel-webdev/AI-Content-Generator-frontend/assets/126319130/2117f43d-5c43-4b5a-8b63-ea0e6ebd191e)
![Registerpage](https://github.com/jameel-webdev/AI-Content-Generator-frontend/assets/126319130/805f980b-c247-4822-b68a-8a6085fcf133)
![Loginpage](https://github.com/jameel-webdev/AI-Content-Generator-frontend/assets/126319130/60231fb8-734a-4740-abf5-a31145b0ded9)
![Dashboard1](https://github.com/jameel-webdev/AI-Content-Generator-frontend/assets/126319130/e6736cbe-cc81-4ec1-8ff3-588d619b6926)
![Dashboard2](https://github.com/jameel-webdev/AI-Content-Generator-frontend/assets/126319130/c6e20db3-462c-4f22-ad5a-01bb5ce8f9e7)
![AIcontent](https://github.com/jameel-webdev/AI-Content-Generator-frontend/assets/126319130/e6a893f9-3983-4f3e-a441-126e56022023)
![Historypage](https://github.com/jameel-webdev/AI-Content-Generator-frontend/assets/126319130/712f7578-2ca0-4cc7-b03b-24985d017ab9)
![Freeplan](https://github.com/jameel-webdev/AI-Content-Generator-frontend/assets/126319130/f91a0b7d-c35e-42b2-9c40-ca765847c635)
![Paymentpage](https://github.com/jameel-webdev/AI-Content-Generator-frontend/assets/126319130/82a569d0-3c27-4cd5-916e-dcf63e42db4f)
