const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/dashboard.controller");

router.use("/",controller.dashboard);

module.exports = router;