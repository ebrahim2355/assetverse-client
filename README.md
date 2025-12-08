# 🚀 AssetVerse — Frontend

## **Modern HR & Asset Management Platform (React + Firebase + JWT + TanStack Query)**

AssetVerse is a complete HR-focused asset management system that helps companies manage employees, assets, requests, affiliations, analytics, and subscriptions.
This repository contains the full frontend (client-side) implementation using:

- **React + Vite**

- **Firebase Authentication**

- **JWT Authorization**

- **TanStack Query**

- **Axios Interceptors (Secure Axios)**

- **Tailwind + DaisyUI**

- **React Router (Route Protection + Nested Dashboard)**

- **Stripe Payment Integration**

- **Responsive UI + Skeleton Loading**

---

### Smart Asset & HR Management Platform
**Live Demo** → https://assetverse.netlify.app/

**Backend Repo** → https://github.com/ebrahim2355/assetverse-server

---

## 📌 Core Features

### 🧑‍💼 **Authentication & Authorization**

- Login / Register (Employee & HR)

- Google OAuth Sign-in

- Firebase Auth management

- Server-issued JWT token (saved in localStorage)

- Secure Axios with token injection + 401/403 auto logout

- Role-based UI:

    - HR Dashboard

    - Employee Dashboard

    - Global role resolver hook (useRole)

────────────

### 🔐 **Role-Based Route Protection**

- Protected dashboard routes

- verifyToken and verifyHR middleware on backend

- Frontend blocks pages depending on:

    - user authentication

    - user role (HR / Employee)

────────────

### 📦 **Asset Management (HR)**

- Add new asset

- Edit asset

- Delete asset

- View asset list

- Pagination + Search + Filters

- Auto-sync with backend via TanStack Query

────────────

### 📝 **Asset Requests (Employee)**

- Search and request an asset

- Debounced search

- Pagination support

- HR receives and manages requests

────────────

### 🧩 **Affiliations (Auto HR → Employee linking)**

- Employee automatically gets assigned to their HR

- HR dashboard shows team list + asset counts

────────────

### 💳 **Payment & Subscription System**

- Stripe checkout flow

- HR can upgrade package

- Automatically updates employee limit & subscription status

────────────

### 📊 **HR Analytics Dashboard**

- Asset Distribution Chart (Returnable vs Non-returnable)

- Top Requested Assets Chart

- Uses Recharts + TanStack Query

────────────

### 🎨 **UI / UX**

- Fully responsive layout

- Reusable components

- Custom Navbar + Footer + Dashboard Layouts

- Skeleton loadings for Packages, Testimonials, etc.

- Error & success handling using react-hot-toast

---

## 🛠️ Tech Stack
### Frontend
| Technology               | Purpose                  |
| ------------------------ | ------------------------ |
| **React (Vite)**         | UI Framework             |
| **Firebase Auth**        | User authentication      |
| **React Router**         | Routing + Private Routes |
| **TanStack Query**       | Data fetching/caching    |
| **Axios + Interceptors** | API calls + JWT handling |
| **TailwindCSS**          | Styling                  |
| **DaisyUI**              | Components               |
| **Recharts**             | Analytics charts         |
| **SweetAlert2**          | Confirmation dialogs     |
| **React Hot Toast**      | Notifications            |

---

## 📂 Project Structure
```
src/
│
├── components/
│   ├── Navbar/
│   ├── Footer/
│   ├── SocialLogin/
│   ├── DashboardSidebar/
│   └── ...
│
├── pages/
│   ├── Auth/
│   ├── ErrorPage/
│   ├── Home/
│   ├── Shared/
│   ├── Dashboard/
│   │    ├── HR/
│   │    └── Employee/
│   └── ...
│
├── hooks/
│   ├── useAuth.jsx
│   ├── useAxios.jsx
│   ├── useAxiosSecure.jsx
│   ├── useRole.jsx
│   └── ...
│
├── layouts/
│   ├── DashboardLayout.jsx
│   └── RootLayout.jsx
│
├── providers/
│   ├── AuthContext.jsx
│   └── AuthProvider.jsx
│
├── routes/
│   ├── AdminRoute.jsx
│   ├── EmployeeRoute.jsx
│   ├── PrivateRoute.jsx
│   ├── RoleBasedDashboard.jsx
│   └── routes.jsx
│
└── firebase/
    └── firebase.config.js
```
---

## ⚙️ Environment Variables
Create a .env file:
```bash
VITE_apiKey=xxxx
VITE_authDomain=xxxx
VITE_projectId=xxxx
VITE_storageBucket=xxxx
VITE_messagingSenderId=xxxx
VITE_appId=xxxx
VITE_image_host_key=xxxx
```

---

## 🔑 Authentication Workflow (Frontend + Backend)

### 🔹 STEP 1: User Logs In
Firebase authenticates them → returns a user object.

### 🔹 STEP 2: `AuthProvider` sends request:
```bash
axiosInstance.post("/jwt", { email: currentUser.email })
```
Backend responds with:
```bash
{ "token": "JWT_TOKEN_HERE" }
```
Stored at:
```bash
localStorage.setItem("access-token", token)
```

### 🔹 STEP 3: All secure requests go through `useAxiosSecure`:
```bash
config.headers.Authorization = `Bearer ${token}`;
```

### 🔹 STEP 4: If backend returns 401/403:
`logOut()`

You are redirected to login.

---

## 👮 Role Detection Logic
Using:
```bash
const { role } = useRole();
```
Which calls:
```bash
GET /users/:email/role
```

Returned values:

- `"hr"`

- `"employee"`

Role determines the UI and dashboard access.

---

## 🔄 Pagination & Search Example
Frontend:
```bash
/assets?available=true&page=2&limit=6&search=laptop
```

Backend:

- Uses `skip`, `limit`, regex search

- Returns:
```bash
{
  "total": 42,
  "page": 2,
  "limit": 6,
  "totalPages": 7,
  "assets": [ ... ]
}
```

---

## 🧪 Testing Guide

**You should test:**

- Login / Register / Google Auth

- HR-only APIs

- Add/Edit/Delete asset

- Pagination + Search

- Employee request flow

- Affiliation auto-creation

- Stripe payment success

- Dashboard charts

- Token expiration handling

---

## 🚀 Deployment Notes
### For Frontend (Vercel / Netlify)

- Set all environment variables

- Add:
```bash
VITE_API_URL=https://your-backend.com
```
### For Backend (Render / Railway)
- Allow CORS from your frontend domain

- Ensure .env contains:

    - JWT_SECRET

    - Stripe keys

    - MongoDB URI

---

## 🧑‍💻 Developer Notes
### 🚨 Important Fixes Integrated

- Fixed "Rendered fewer hooks" issue (moved `useEffect` before conditional returns)

- Corrected `access-token` storage naming typo

- Fixed verifyHR middleware by defining it AFTER collections

- Rebuilt Navbar logic that caused hook mismatch

- added skeleton loadings to prevent premature return of components

---

## ❤️ Credits

Developed by **MD. Ebrahim Ali**

AssetVerse — HR & Asset Management