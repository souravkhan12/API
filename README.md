# 📚 Book Review API

A simple Node.js and Express.js-based RESTful API for managing books and their reviews, with authentication handled via cookies and JWT. Data is stored using MongoDB via Mongoose.

---

## 📦 Project Setup

### 📋 Prerequisites:
- Node.js >= 18.x  
- MongoDB installed locally or a cloud URI (MongoDB Atlas)  
- npm (Node Package Manager)

---

## 🚀 Installation & Run

1️⃣ Clone the repository:
```bash
git clone https://github.com/souravkhan12/API
cd API
```

2️⃣ Install dependencies:
```bash
npm install
```

3️⃣ Set up environment variables in a `.env` file:
```env
PORT=8001
MONGODB_URI=mongodb://localhost:27017/book_review
JWT_SECRET=your_secret_key
```

4️⃣ Start the development server:
```bash
npm start
```

---

## 📖 API Endpoints

### 🔐 Auth
- `POST /signup` — User signup  
- `POST /login` — User login  
- Uses JWT stored in a cookie named `uid`

---

### 📚 Books

- `GET /books` — Fetch list of books  
- `POST /books` — Add a new book  

**Request Body:**
```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "description": "A book about tiny habits making big changes."
}
```

- `GET /books/:id` — Get details of a specific book

---

### ✍️ Reviews

- `POST /books/:id/reviews` — Add a review to a book  

**Request Body:**
```json
{
  "review": "Incredible book on habits!"
}
```

- `PUT /reviews/:id` — Update a review  

**Request Body:**
```json
{
  "review": "Updated review content"
}
```

- `DELETE /reviews/:id` — Delete a review

---

## 📜 Example Requests (Postman / curl)

**Create a Book**
```bash
curl -X POST http://localhost:8001/books \
-H "Content-Type: application/json" \
--cookie "uid=your_jwt_token_here" \
-d '{"title":"Deep Work","author":"Cal Newport","description":"On focused success."}'
```

**Add a Review**
```bash
curl -X POST http://localhost:8001/books/<book_id>/reviews \
-H "Content-Type: application/json" \
--cookie "uid=your_jwt_token_here" \
-d '{"review":"Must-read book!"}'
```

---

## 📌 Design Decisions & Assumptions

- **Authentication** is handled via JWT tokens stored in HTTP cookies named `uid`
- **Mongoose** is used for schema validation and database management
- Only authenticated users can create books or post reviews
- No role-based permissions — all logged-in users have equal access

---

## 📎 Dependencies

- express  
- mongoose  
- cookie-parser  
- jsonwebtoken  
- uuid  
- dotenv  
- nodemon (dev)

---

## 👨‍💻 Author

Sourav Khan

---
