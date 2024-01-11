const express = require("express");
const router = express.Router();

// Add Route
const UserController = require("../app/controllers/UserController");

router.get("/:id", ensureAuthenticated, UserController.index);

router.put("/:id/edit", ensureAuthenticated, UserController.edit);

router.delete("/:id/delete", ensureAuthenticated, UserController.delete);

// Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/auth/login");
  }
}

module.exports = router;
