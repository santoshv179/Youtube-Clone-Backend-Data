# 🎥 YouTube Clone Backend (Node.js + Express + MongoDB)

A backend API for a YouTube-like platform built with **Node.js**, **Express**, and **MongoDB**.  
This API handles **user authentication**, **video uploads**, **channel management**, **comments**, **likes/dislikes**, and more.

---

## 🚀 Features

- **User Authentication** (Register, Login, Logout, Get Current User)
- **Channels CRUD + Subscription**
- **Videos CRUD + Search + Filter**
- **Comments CRUD**
- **Likes / Dislikes**
- **Protected Routes using JWT**
- **Centralized Error Handling**
- **CORS Enabled** for cross-origin requests

---

## 🛠 Tech Stack

- **Backend Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (JSON Web Token)
- **File Uploads:** Multer
- **Environment Variables:** dotenv

---

## API Endpoints
Auth Routes (/api/auth)
Method	Endpoint	Description	Auth Required
POST	/register	Register new user	❌
POST	/login	Login user	❌
POST	/logout	Logout user	✅
GET	/me	Get logged-in user	✅

Channel Routes (/api/channels)
Method	Endpoint	Description	Auth Required
GET	/	Get all channels	❌
POST	/	Create channel (with files)	✅
GET	/me	Get my channel	✅
GET	/:id	Get channel by ID	❌
GET	/:id/videos	Get videos from a channel	❌
PUT	/:id	Update channel	✅
DELETE	/:id	Delete channel	✅
POST	/:id/subscribe	Subscribe to channel	✅
POST	/:id/unsubscribe	Unsubscribe from channel	✅

Video Routes (/api/videos)
Method	Endpoint	Description	Auth Required
GET	/	Get all videos	❌
GET	/user	Get logged-in user's videos	✅
GET	/search	Search videos by title	❌
GET	/category/:cat	Filter by category	❌
GET	/:id	Get video by ID	❌
POST	/	Upload new video	✅
PUT	/:id	Update video	✅
DELETE	/:id	Delete video	✅
POST	/:id/like	Like a video	✅
POST	/:id/dislike	Dislike a video	✅

Comment Routes (/api/comments)
Method	Endpoint	Description	Auth Required
POST	/:videoId	Add comment to a video	✅
GET	/:videoId	Get comments for a video	❌
PUT	/:commentId	Update comment	✅
DELETE	/:commentId	Delete comment	✅


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/santoshv179/Youtube-Clone-Backend-Data.git
cd youtube-clone-backend

npm install

PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

npm start
---bash

🏆 Author
Your Name Santosh Verma