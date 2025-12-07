// Backend (e.g., server.js or index.js)

const express = require("express");
const cors = require("cors");
const app = express();

// --- Configuration Constants ---

// The server will use the port provided by the hosting environment (process.env.PORT) 
// or default to 5000 for local development.
const PORT = process.env.PORT || 5000;

// Hardcoded dummy credentials for demonstration purposes.
// NOTE: In a real application, these should be securely hashed and stored in a database.
const VALID_USERNAME = "aravind";
const VALID_PASSWORD = 123; // Keeping it numeric as in the original code

// --- Deployment & Security Configuration (CORS) ---

// Define allowed origins for Cross-Origin Resource Sharing.
// 1. Local Dev URL (Frontend default for React/Vite)
// 2. The live frontend URL, fetched from an environment variable (set on Render/Heroku/etc.)
//    Use a comma-separated string if the hosting service supports it, or set the single live URL.
const DEV_FRONTEND_URL = 'http://localhost:3000'; // Common React/Vite dev port

const allowedOrigins = [
    DEV_FRONTEND_URL,
    'http://localhost:5173', // If using a different local port
    'http://localhost:5000', // Allow requests from self during local development (less common)
];

// Add the deployed frontend URL if the environment variable is set
if (process.env.FRONTEND_URL) {
    // Check for multiple URLs separated by commas if needed, otherwise add as-is.
    allowedOrigins.push(process.env.FRONTEND_URL); 
}

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    methods: ['POST', 'GET', 'OPTIONS'],
    credentials: true
};

// Apply CORS Middleware
app.use(cors(corsOptions));

// --- Middleware ---
// Parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --- Routes ---

// 1. Login Route (POST)
app.post("/login", (req, res) => {
    const { username, password } = req.body; // Use destructuring for clarity

    console.log(`Attempting login for: ${username}`);

    // Check credentials. Using `===` for strict comparison.
    // Ensure the password sent in the body is converted to a number for comparison
    // with the numeric VALID_PASSWORD (123).
    if (username === VALID_USERNAME && Number(password) === VALID_PASSWORD) {
        console.log("Login successful.");
        // Sending status 200 (OK) with a boolean value of true
        res.status(200).send(true); 
    } else {
        console.log("Login failed: Invalid credentials.");
        // Sending status 401 (Unauthorized) with a boolean value of false
        res.status(401).send(false);
    }
});

// 2. Root Route (GET)
// Useful for a quick health check of the deployed server.
app.get("/", (req, res) => {
    res.status(200).send("Node/Express Backend is running successfully!");
});


// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Server Started successfully on port ${PORT}.`);
    console.log(`Allowed Frontend URL(s): ${allowedOrigins.join(', ')}`);
});