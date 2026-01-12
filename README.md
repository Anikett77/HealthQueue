# 🏥 Digital Patient Queue & Appointment Management System

A modern, mobile-first frontend built with **React + TailwindCSS** for a Government Hospital Digital Queue & Appointment Management System.  
The project focuses on improving patient flow, reducing waiting time, and providing real-time queue visibility through an intuitive UI.

---

## ✨ Features

### 👤 Patient Interface
- **Landing Page**: Clean landing page with clear CTAs and feature highlights  
- **Login / OTP Page**: Phone number–based authentication UI  
- **Book Appointment**: Multi-step booking flow with hospital, department, doctor, date, and time selection  
- **Live Queue Status**: Real-time queue tracking with progress bar and estimated waiting time  
- **My Appointments**: View and manage booked appointments  

---

### 👨‍⚕️ Doctor Interface
- **Doctor Dashboard**:
  - Current patient display  
  - Queue view for next 5 patients  
  - Action buttons: *Mark Completed, Skip, Emergency*  
  - Statistics such as total patients and average consultation time  

---

### 🛠️ Admin Interface
- **Admin Dashboard**:
  - System statistics cards  
  - Department-wise patient load visualization  
  - Doctor management table  
  - Queue configuration options (Emergency Priority, Senior Citizen Priority)  

---

## 🧰 Tech Stack

- **React 18** – Functional components  
- **Vite** – Fast build and development tool  
- **TailwindCSS** – Utility-first CSS framework  
- **React Router** – Client-side routing  

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)  
- npm or yarn
  


### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Button.jsx
│   └── Card.jsx
├── pages/
│   ├── patient/         # Patient interface pages
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── BookAppointmentPage.jsx
│   │   ├── QueueStatusPage.jsx
│   │   └── MyAppointmentsPage.jsx
│   ├── doctor/          # Doctor interface pages
│   │   └── DoctorDashboard.jsx
│   └── admin/           # Admin interface pages
│       └── AdminDashboard.jsx
├── data/
│   └── mockData.js      # Mock data for demo
├── App.jsx              # Main app component with routing
├── main.jsx             # Entry point
└── index.css            # TailwindCSS imports
```

## Design Guidelines

- **Color Palette**: HealthTech theme with Blue (#3b82f6), White, and Light Green (#10b981) accents
- **Typography**: Large, readable fonts optimized for accessibility
- **Layout**: Mobile-first responsive design
- **UI Elements**: Rounded cards, subtle shadows, clean government-friendly design

## Mock Data

All data used in the application is mock/dummy data
No backend or API integration is included
Intended purely for demo and UI showcase purposes.

## Routes

- `/` - Landing Page
- `/patient/login` - Patient Login
- `/patient/book-appointment` - Book Appointment
- `/patient/queue-status` - Live Queue Status
- `/patient/appointments` - My Appointments
- `/doctor/dashboard` - Doctor Dashboard
- `/admin/dashboard` - Admin Dashboard

## Notes

- This is a frontend-only application with no backend integration
- All data is static/mock data for demo purposes
- Perfect for hackathon demonstrations and UI/UX showcases

