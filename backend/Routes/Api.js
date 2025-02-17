const { Router } = require("express");
const { text_to_img } = require("../Controllers/Api");

const router = Router();

// Use POST to send prompt data
router.post("/text", text_to_img);

module.exports = router;
