const { Router } = require("express");
const { signupUser, signinUser } = require("../Controllers/Users");

const router = Router();

// Authentication routes
router.post('/signup', signupUser);
router.post('/signin', signinUser);

module.exports = router;  // Exporting directly as `router`
