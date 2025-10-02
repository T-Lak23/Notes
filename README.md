Got it! I’ll create a complete `README.md` for your project, including backend and frontend setup, environment variables, and instructions. I’ll make it clear, structured, and beginner-friendly. Here’s a draft based on your previous chats and stack (MERN + Zustand + Vite frontend):

````markdown
# Project Name

A full-stack **MERN (MongoDB, Express, React, Node.js)** application with user authentication, note management, and more. Frontend is built using **Vite + React**, and backend is an **Express** server connected to **MongoDB**. Zustand is used for state management on the frontend.

---

## Features

- User Authentication (Register/Login)
- JWT-based Authentication with Cookies
- Create, Read, Update, Delete (CRUD) Notes
- Filter, Search, and Sort Notes
- Infinite Scroll / Load More functionality
- Responsive Frontend UI
- Fully separated backend and frontend environments

---

## Tech Stack

**Frontend:**

- React + Vite
- Zustand (state management)
- Axios (API requests)
- React Router (routing)
- Tailwind CSS / optional styling

**Backend:**

- Node.js + Express
- MongoDB (Atlas or local)
- Mongoose
- Cookie-parser
- bcrypt (password hashing)
- jsonwebtoken (JWT auth)
- dotenv (env variables)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/T-Lak23/Notes.git
cd Notes
```
````

---

### 2. Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Look for an **env.js** file in the backend `/config` folder:

```javascript
export const ENV = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  COOKIE_NAME: process.env.COOKIE_NAME || "token",
};
```

4. Add a `.env` file in the backend root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
COOKIE_NAME=token
```

5. Start the backend server:

```bash
npm run dev
```

The backend should now be running at `http://localhost:3000` (or your specified PORT).

---

### 3. Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the frontend root:

```env
VITE_SERVER_URL=http://localhost:3000
```

> **Note:** `VITE_SERVER_URL` is used in your frontend API calls with Axios. Update it to your deployed backend URL when deploying the app.

4. Start the frontend:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (Vite default port).

---

## Folder Structure

```
/backend
 ├─ /config        # Database & env configs
 ├─ /controllers   # API controllers
 ├─ /middlewares   # Middleware (auth, error handling)
 ├─ /models        # Mongoose models
 ├─ /routes        # Express routes
 ├─ /utils         # utility files
 ├─ /validations   #Joi validations
 └─ index.js      # Main backend entry

/frontend
 ├─ /src
 │   ├─ /components  # React components
 │   ├─ /pages       # Pages (Home, Notes, Dashboard, etc.)
 │   ├─ /store       # Zustand store
 │   ├─ /utils       # axios api
 │   └─ main.jsx
 └─ vite.config.js
```

---

## Environment Variables Recap

**Backend (`.env` + env.js)**

```env
PORT=5000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
COOKIE_NAME=token
```

**Frontend (`.env`)**

```env
VITE_SERVER_URL=http://localhost:3000
```

> Always ensure `VITE_SERVER_URL` matches your backend URL (local or deployed).

---

## Deployment

1. Deploy backend to **Render / Railway / Heroku**.
2. Update `VITE_SERVER_URL` in the frontend `.env` with the deployed backend URL.
3. Build frontend:

```bash
npm run build
```

4. Deploy frontend to **Render/ Vercel / Netlify**.

---

## Notes

- Make sure MongoDB Atlas allows your IP or set to `0.0.0.0/0` for testing.
- JWT cookies are HttpOnly for security.
- Load More button implements cursor-based pagination (see frontend store for details).

---

## License

MIT License

---

```

```
