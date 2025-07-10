# WorkNest Frontend

**WorkNest** is a modern and responsive single-page application (SPA) built with React. It acts as the frontend interface for the WorkNest platform – a service marketplace where users can book verified workers, track progress through a ticket system, and interact with dashboards tailored to different user roles.

---

## ✨ Features

- 🔐 JWT-based user authentication (login & register)
- 🧑‍💼 Role-based dashboards for `User`, `Worker`, and `Admin`
- 📅 Appointment booking modal with real-time interaction
- 🧾 Multi-stage ticket tracking system (Requested → Accepted → In Progress → Completed → Paid → Reviewed)
- 📂 Profile picture upload and editing
- 📍 Distance-based worker sorting
- 📊 Admin panel for approving workers
- 🎨 Clean and modular UI using custom stylesheets

---
## 🔧 Technologies Used

- React.js
- Axios
- React Router
- CSS Modules / Custom Styles
- JWT for auth (via localStorage)
- Integrated with Django REST API

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/MithunPranavaR/WorkNest-Frontend.git
cd WorkNest-Frontend

### 2️⃣ Install Dependencies
npm install
### 3️⃣ Run the App
npm start
App runs on: http://localhost:3000

Make sure your backend is running and CORS is enabled on Django side.
🔐 Environment Variables (Optional)
Create a .env file at the root and add:
REACT_APP_API_BASE_URL=http://localhost:8000/api

