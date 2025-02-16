require("dotenv").config();
const express = require("express");
const UserRoutes = require("./backend/Routes/Users"); // Correct import

const port = process.env.PORT || 8000;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
    res.send("Working properly");
});

// Use UserRoutes correctly
app.use('/api/user', UserRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
