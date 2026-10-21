<p align="center">
  <h1>🍽️ FlashEats</h1>
  <p>Smart Canteen Ordering System </p>
</p>

A **web-based platform** that allows students to order food from the college canteen online and enables canteen staff to manage orders efficiently through an admin dashboard.

This project aims to **reduce long queues, improve order management, and provide a better experience for students and canteen staff.**

---

# 📌 Project Overview

In traditional college canteens, students often face **long waiting lines and manual order processing**. Managing orders manually can lead to delays, confusion, and inefficient service.

The **Online Canteen Management System** solves this problem by providing:

- Online food ordering
- Real-time order tracking
- Admin dashboard for order management
- Secure user authentication

Students can browse the menu, place orders, and track the order status, while the canteen staff can manage and update orders through the admin panel.

---
# 👥 Developed By  
### 👨‍💻 Team: *Parse*

|  Name              |  Roll No.    |
|---------------------|----------------|
| Prajit Kumar Singh  | 2400520100054  |
| Priyanshu           | 2400520100057  |
| Parth Mishra        | 2400520100053  |
| Sachlang Debbarma   | 2400520100063  |
| Umang Rana          | 2400520100070  |

---

# 🚀 Features

## Student Features
- User Registration and Login
- Browse Canteen Menu
- Place Food Orders
- View Order History
- Track Order Status

## Admin Features
- Admin Dashboard
- View All Orders
- Update Order Status
- Manage Menu Items
- Monitor Order Activity

## Security
- JWT Authentication
- Password Hashing using bcrypt
- Role-based access control

---

# 🏗️ System Architecture

The system follows a **full-stack web architecture**:

1. **Frontend Layer**
   - Built with React and Tailwind CSS
   - Handles user interface and user interactions

2. **Backend Layer**
   - Built using Node.js and Express.js
   - Handles API requests and logic

3. **Database Layer**
   - MongoDB used for storing users, menu items, and orders

4. **Admin Panel**
   - Allows canteen staff to manage incoming orders

---

# 🛠️ Tech Stack

## Frontend
<p align="left">
  <img src="https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-0F172A?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC" />
</p>


## Backend
<p align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
</p>


## Database
<p align="left">
  <img src="https://img.shields.io/badge/MongoDB-001E2B?style=for-the-badge&logo=mongodb&logoColor=4EA94B" />
</p>


## Authentication
<p align="left">
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens" />
  <img src="https://img.shields.io/badge/bcrypt-003A8F?style=for-the-badge&logo=security&logoColor=white" />
</p>


## Deployment & Tools
<p align="left">
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=FF9900" />
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
</p>

---

# 📂 Project Structure
```
📦 FlashEats
├── 📁 client
|   ├── 📁 api
│   ├── 📁 components
│   ├── 📁 pages
│   ├── 📁 context
│   ├── 📄 main.jsx
│   └── 📄 App.jsx
│
├── 📁 server
│   ├── 📁 routes
│   ├── 📁 utils
│   ├── 📁 config
│   ├── 📁 middlewares
│   ├── 📁 models
│   └── 📄 server.js
│
└── 📄 README.md
```

---

# 🔗 Live Demo

- 🌍 Frontend: http://flasheats-client.s3-website-us-east-1.amazonaws.com
- 🔗 Backend API: http://54.198.200.88:5000

---

# ⚙️ Installation Guide

### 1. Clone the repository
```bash
git clone https://github.com/vpcoder001/Flash_Eats.git
cd Flash_Eats
```

### 2. Configure Environment Variables

#### Backend (`server/.env`)
Copy the sample environment file in `server/`:
```bash
cp server/.env.example server/.env
```
Update `server/.env` with your credentials:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
SENDGRID_API_KEY=SG.your_sendgrid_api_key
EMAIL_FROM=your_verified_sender_email
```

#### Frontend (`client/.env`)
Copy the sample environment file in `client/`:
```bash
cp client/.env.example client/.env
```
Update `client/.env` with your frontend variables:
```env
VITE_API_URL=http://localhost:5001
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

### 3. Install Dependencies & Run

#### Backend Server
```bash
cd server
npm install
npm run dev
```

#### Frontend Client
```bash
cd client
npm install
npm run dev
```

### 4. Default Admin Credentials
- **Email**: `admin@ietlucknow.ac.in` (or `admin1@ietlucknow.ac.in`)
- **Password**: `admin123`
- **Role**: Select **Admin** on the login page (no OTP required)

---

# 🔄 Order Flow

1. User logs in
2. Selects food items
3. Places order
4. Order stored in database
5. Admin receives order
6. Admin updates status
7. User tracks order

---

# 📡 API Endpoints

## Auth
POST /api/auth/register
POST /api/auth/login

## Orders
GET /api/orders
POST /api/orders
PUT /api/orders/:id

---

# 💡 Why FlashEats?

This project was built to solve real problems faced in college canteens like long queues and inefficient order handling. It focuses on improving user experience and operational efficiency.

---

# 📜 License

This project is licensed under the MIT License.
See the LICENSE file for details.



