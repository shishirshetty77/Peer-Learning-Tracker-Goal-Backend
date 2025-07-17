# 🧠 Peer Learning Tracker Lite – Backend (Express + MongoDB)

This is the **backend server** for the Peer Learning Tracker Lite app — a collaborative platform where users can join learning groups, track their learning goals, and view progress within a peer community.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose
- **JWT Authentication**
- **RESTful APIs**
- **CORS + dotenv**

---

## 📁 Project Structure

```
server/
├── models/              # Mongoose schemas (User, Group, Goal)
├── routes/              # API routes (auth, goals, groups)
├── middleware/          # Auth middleware (JWT token check)
├── .env                 # Environment variables (never committed)
├── .gitignore
├── index.js             # Entry point
```

---

## 🔐 Environment Variables (`.env`)

Create a `.env` file in the `server/` folder:

```env
PORT=8080
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_super_secret_key
```

> Make sure `.env` is listed in `.gitignore` so it's never committed.

---

## 🧪 API Endpoints

### 📌 Auth (`/api/auth`)
- `POST /register` — Register a new user
- `POST /login` — Login and receive JWT token
- `GET /me` — Get current user (token required)

### 📌 Goals (`/api/goals`)
- `GET /` — Get all personal goals
- `POST /` — Create a new goal
- `PUT /:id` — Update goal progress/title
- `DELETE /:id` — Delete a goal
- `GET /by-group/:groupId` — View goals from a group

### 📌 Groups (`/api/groups`)
- `GET /` — View all groups
- `POST /create` — Create a new group
- `POST /join/:groupId` — Join a group
- `GET /:groupId/details` — View members + goals
- `DELETE /:groupId` — Delete group (only by creator)

---

## 🔒 Authentication

All protected routes use a JWT token passed in the header:

```
Authorization: Bearer <your-token>
```

Use this token in tools like **Thunder Client** or **Postman** to test secured endpoints.

---

## ✅ Running the Server Locally

```bash
cd server
node index.js

```

The server will run at `http://localhost:8080`

---

## 📦 Recommended Tools

- [Thunder Client](https://www.thunderclient.com/) — for testing APIs inside VS Code
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) — cloud DB connection
- [JWT.io](https://jwt.io/) — to decode tokens while testing

---

## 📜 License

MIT License. Feel free to fork, learn, and build on top of it.

---

## 🙌 Author

Built with 💻 by [Shishir Shetty](https://github.com/shishirshetty77)

> For the full-stack app (including frontend), check out the main repo or frontend folder.
