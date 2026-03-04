# Elevate — Valorant Coaching Platform

Elevate is a full-stack web platform connecting Valorant players with verified professional coaches. Players can browse coaches, book sessions, submit VODs for review, and communicate directly — all in one place.

**Live** → [elevate-xqw2.onrender.com](https://elevate-xqw2.onrender.com)

---

## Features

**For Players**
- Browse and filter verified Valorant coaches by rank and role
- Book and pay for review sessions via Razorpay
- Submit gameplay VODs for coach review
- Receive structured feedback with skill ratings and coach notes
- Real-time messaging with hired coaches

**For Coaches**
- Dedicated coach dashboard to manage incoming review requests
- Upload gameplay showcase videos to profile
- Review player VODs and submit detailed written feedback with skill ratings
- Real-time chat with players

**Platform**
- Secure JWT-based authentication for both players and coaches
- Cloudinary-powered video and image storage
- Real-time updates via Socket.io
- Smooth scroll and animated UI

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React, TailwindCSS, Aceternity UI, Framer Motion, Lenis |
| Backend | Node.js, Express.js, MongoDB, Mongoose |
| Real-time | Socket.io |
| Payments | Razorpay |
| Media Storage | Cloudinary |
| State Management | Zustand |
| Hosting | Render
| Monitoring | UptimeRobot |

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account
- Razorpay account

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/elevate.git
   cd elevate
   ```

2. Install dependencies for both frontend and backend:
   ```sh
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. Set up environment variables in `backend/.env`:
   ```sh
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key

   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret

   CLIENT_URL=http://localhost:5173
   ```

4. Start the backend:
   ```sh
   cd backend && npm start
   ```

5. Start the frontend:
   ```sh
   cd frontend && npm run dev
   ```

---

## Project Structure

```
elevate/
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components (sidebar, modals, cards)
│   │   ├── pages/           # Route-level pages
│   │   ├── store/           # Zustand state stores
│   │   └── lib/             # Axios instance, utils
├── backend/
│   ├── controllers/         # Route logic
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Express routers
│   ├── middleware/          # Auth middleware
│   └── seed.js              # Coach seeding script
```

---

## Contributing

Contributions are welcome. Open an issue first to discuss what you'd like to change, then submit a pull request.

---

## Contact

Arnav Upadhyay — [arnavupadhyay7@gmail.com](mailto:arnavupadhyay7@gmail.com)
