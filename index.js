// Backend (e.g., server.js or index.js)

const express = require("express");
const cors = require("cors");

const app = express();

// --- DEPLOYMENT CHANGES START HERE ---

// 1. Dynamic Port: Use the port provided by the hosting environment (Render/Heroku), or default to 5000 for local testing.
const PORT = process.env.PORT || 5000;

// 2. Security: Configure CORS to specifically allow requests from your live Frontend URL.
// IMPORTANT: Replace 'https://YOUR-FRONTEND-URL.com' with the actual URL you get when deploying the frontend (e.g., https://my-project.onrender.com).
// For the initial test, you can set origin: '*' but always switch to your actual domain for submission/security.
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173'; // Default for local testing (React default port)

// You need to set 'FRONTEND_URL' as an Environment Variable in your Render/hosting service settings for the Backend.
app.use(cors({
    origin: allowedOrigin,
    methods: ['POST', 'GET', 'OPTIONS'], // Define which methods are allowed
    credentials: true
}));

// --- DEPLOYMENT CHANGES END HERE ---


var username = "aravind";
var password = 123;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
    console.log(req.body.username);

    if (req.body.username === username && Number(req.body.password) === password) {
        // In a real app, you would send a JWT token here. For this simple case, true is fine.
        res.status(200).send(true);
    } else {
        res.status(401).send(false); // Use 401 for Unauthorized
    }
});

app.get("/", (req, res) => {
    res.send("Backend is running!"); // Simple check to ensure server is live
});

app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}...`);
});