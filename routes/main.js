const express = require("express");

const router = express.Router();
const authenticationMiddleware = require("../middleware/auth");
const { dashboard, login } = require("../controllers/main");

router.route("/login").post(login);
router.route("/dashboard").get(authenticationMiddleware, dashboard);

module.exports = router;
