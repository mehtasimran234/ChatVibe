const express = require("express");
const { registerUser, authUser } = require("../controllers/userContoller");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);

module.exports = router;
