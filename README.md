# 🛍️ RIVIERA - E-commerce Web App

RIVIERA is a full-stack e-commerce web application . It allows users to browse products, manage cart, add addresses, and place orders seamlessly.

---

## 🚀 Features

### 🧑‍💻 User Features
- User signup & login
- Browse products with search & category filter
- Add to cart / update quantity / remove items
- Address management (add & select delivery address)
- Smooth checkout flow
- Place order (Cash on Delivery)

### 🛠️ Admin Features
- Add, edit, delete products
- Upload product images (Cloudinary)
- Manage stock

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Other Tools
- Cloudinary (Image hosting)
- Axios (API requests)

---

## 📁 Project Structure
root/
├── frontend/ # React app
├── backend/ # Express server

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
cd backend
npm install


PORT=5000
MONGO_URI=your_mongodb_connection
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_secret


npm run dev

cd frontend
npm install
npm run dev

