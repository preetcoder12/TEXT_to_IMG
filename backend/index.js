require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoutes = require("./Routes/Users");
const Api_fetched = require("./Routes/Api")

const port = process.env.PORT || 8000;
const app = express();

//  Middleware: Enable CORS for frontend requests
app.use(cors());

//  Middleware: Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  MongoDB Connection with error handling
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

//  Test Route
app.get("/", (req, res) => {
    res.send("🚀 Server is running properly!");
});

app.use("/api/user", UserRoutes);
app.use("/api", Api_fetched);


app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
