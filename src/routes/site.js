const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");

// [GET]
// wellcome to server
router.get("/", siteController.index);

router.get("/404", siteController.err);

module.exports = router;
