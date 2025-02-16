const { Router } = require("express");
const { signupUser, signinUser } = require("../Controllers/Users");

const router = Router();

// Authentication routes
router.get('/signup', signupUser);
router.get('/signin', signinUser);

module.exports = router;  // Exporting directly as `router`
