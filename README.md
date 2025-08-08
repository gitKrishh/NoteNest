# 📝 NoteNest - A Modern MERN Stack Notes App

![NoteNest Screenshot](https://via.placeholder.com/1200x600.png?text=NoteNest+Application+Screenshot)

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=nodedotjs)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6-47A248?logo=mongodb)](https://www.mongodb.com/)

</div>

A full-stack note-taking application built with the MERN stack (MongoDB, Express.js, React, Node.js). NoteNest allows users to securely create, manage, and view their personal notes with a clean, modern, and responsive interface.

---

## ✨ Live Demo

* **Frontend:** [https://notenest-e5bca.web.app/](https://notenest-e5bca.web.app/)
* **Backend:** [https://notenest-api-vk54.onrender.com/](https://notenest-api-vk54.onrender.com/)

---

## 🚀 Key Features

* **🔐 Secure Authentication:** Full user registration and login flow using JSON Web Tokens (JWT) for session management and password hashing with `bcrypt.js`.
* **📝 Full CRUD for Notes:** Users can Create, Read, Update, and Delete their personal notes.
* **💅 Modern UI:** A responsive and beautiful user interface built with React and Material-UI, featuring a custom theme, dark mode, and subtle animations.
* **✍️ Rich Text Editor:** Create notes with formatted text, lists, and more using `react-quill`.
* **🔍 Search & Filter:** Easily find notes with a real-time search functionality.
* **Protected Routes:** Frontend routes are protected to ensure only authenticated users can access their notes.
* **⭐ Polished UX:** Features like modal views for notes, instant UI updates, loading spinners, and error handling provide a smooth user experience.
* **💬 Feedback System:** Any user can submit feedback about the application.
* **🔒 Admin Dashboard:** A protected, admin-only route to view all user-submitted feedback.

---

## 📁 Folder Structure

```text
NoteNest/
│
├── 📁 backend/
│   ├── 📁 controllers/      # Contains the logic for API routes
│   ├── 📁 models/           # Mongoose schemas for the database
│   ├── 📁 routes/            # API route definitions
│   ├── .env                  # Environment variables
│   ├── package.json
│   └── server.js             # The main Express.js server entry point
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/     # Reusable React components (Header, NoteCard, etc.)
│   │   ├── 📁 context/        # Global state management (AuthContext)
│   │   ├── 📁 pages/          # Page components (HomePage, LoginPage, etc.)
│   │   ├── 📁 services/       # API connection logic (api.js)
│   │   ├── App.jsx           # Main app layout and routing
│   │   └── main.jsx          # React app entry point
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── README.md
└── vercel.json OR firebase.json # Deployment configuration
```

## 🛠️ Tech Stack

* **Frontend:** React, Vite, React Router, Axios, Material-UI
* **Backend:** Node.js, Express.js, Mongoose
* **Database:** MongoDB (via MongoDB Atlas)
* **Authentication:** JSON Web Tokens (JWT), bcrypt.js
* **Deployment:**
    * Backend on **Render**
    * Frontend on **Netlify / Firebase Hosting**

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/en/) (v16 or later)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [Git](https://git-scm.com/)
* A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or a local MongoDB installation.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/gitKrishh/NoteNest.git
    cd notenest
    ```

2.  **Setup the Backend:**
    ```sh
    # Navigate to the backend folder
    cd backend

    # Install dependencies
    npm install

    # Create a .env file in the backend folder
    # and add your variables (see .env.example)
    touch .env

    # Start the backend server
    npm run dev
    ```

3.  **Setup the Frontend:**
    ```sh
    # Navigate to the frontend folder from the root directory
    cd frontend

    # Install dependencies
    npm install

    # Start the frontend development server
    npm run dev
    ```

### Environment Variables

You will need to create a `.env` file in the `backend` directory.

**Backend (`backend/.env`):**
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

Your frontend will automatically connect to `http://localhost:5001` in development mode.

---

## 📜 API Endpoints

<details>
<summary>Click to view API documentation</summary>

| HTTP Method | Endpoint            | Description                  | Access   |
|-------------|---------------------|------------------------------|----------|
| `POST`      | `/api/users/register` | Register a new user          | Public   |
| `POST`      | `/api/users/login`    | Log in a user                | Public   |
| `GET`       | `/api/notes`          | Get all notes for a user     | Private  |
| `POST`      | `/api/notes`          | Create a new note            | Private  |
| `PUT`       | `/api/notes/:id`      | Update a specific note       | Private  |
| `DELETE`    | `/api/notes/:id`      | Delete a specific note       | Private  |

</details>

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

Krish - [msgkrish192@gmail.com](mailto:msgkrish192@gmail.com)

Project Link: [https://github.com/gitKrishh/NoteNest](https://github.com/gitKrishh/NoteNest)