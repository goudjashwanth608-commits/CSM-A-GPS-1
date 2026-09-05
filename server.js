const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

// Password can be changed in Render Environment Variables.
// For initial testing, this fallback password is used.
const PASSWORD = process.env.CSM_PASSWORD || "CSMA2026";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve website files from public folder
app.use(express.static(path.join(__dirname, "public")));

// Login
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Username and password are required."
        });
    }

    if (password !== PASSWORD) {
        return res.status(401).json({
            success: false,
            message: "Incorrect password."
        });
    }

    res.json({
        success: true,
        username: username
    });
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        app: "CSM-A"
    });
});

// Send unknown routes back to the website
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`CSM-A running on port ${PORT}`);
});
