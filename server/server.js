const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const expertRoutes = require("./routes/expertRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

// Create HTTP server
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

// Socket connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// Make io available everywhere
app.set("io", io);

// Database connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/experts", expertRoutes);
app.use("/api/bookings", bookingRoutes);

// Error handler (must be last)
app.use(errorHandler);

// Test route
app.get("/", (req, res) => {
    res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

// Start server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});