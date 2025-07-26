📘 School Management System – Admin Dashboard
Live Demo: https://school-management-dashboard-azure.vercel.app

A modern, responsive, and animated Admin Dashboard built for managing a school’s core operations including students, teachers, classes, reports, and settings. This Progressive Web App (PWA) includes push notification demo support and clean UI components.







![Uploading Screenshot 2025-07-26 125628.png…]()







✨ Features
✅ Responsive Admin Dashboard

✅ Progressive Web App (PWA) Setup

✅ Push Notification Demo

✅ Clean UI and Animated Interactions

✅ Dark/Light Mode Toggle (if available)

✅ Modular Codebase & Component Reuse

🔧 Tech Stack
Frontend Framework: React.js / Next.js (depends on your implementation)

Styling: Tailwind CSS

PWA Setup: manifest.json, Service Worker, Installable App

Notifications: Simulated Push Notification using Web API or Firebase Cloud Messaging (optional)

Deployment: Vercel

🚀 Getting Started
Prerequisites
Node.js (>= 16)

npm or yarn

Installation

git clone https://github.com/your-username/school-management-dashboard.git
cd school-management-dashboard
npm install
Run Locally

npm run dev
Visit: http://localhost:3000

📱 PWA Support
Install the app directly on desktop or mobile browsers.
Offline caching enabled via service worker.
Configured with custom app icon, splash screen, and theme color.

🔔 Push Notification Demo
On the dashboard, click "Send Notification" to trigger a sample browser notification.

Grant browser permission if prompted.

(For production-ready messaging, Firebase Cloud Messaging integration is suggested.)

📁 Folder Structure

📦 school-management-dashboard/
├── public/
│   ├── icons/               # App icons
│   ├── manifest.json        # PWA manifest
│   └── service-worker.js    # Custom service worker
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Route components
│   ├── styles/              # Global styles or Tailwind config
│   └── utils/               # Notification logic, helpers
├── .eslintrc, tailwind.config.js, etc.


📄 License
This project is licensed under the MIT License.

🙌 Acknowledgements
Tailwind CSS
React.js
Vercel
Firebase (optional)
