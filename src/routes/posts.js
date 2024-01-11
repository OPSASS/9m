const express = require("express");
const router = express.Router();

const { upload } = require("../middleware/multer");

// Add Route
const PostsController = require("../app/controllers/PostsController");

// render
// post index
// /san-pham/them-san-pham
router.get("/them-san-pham", ensureAuthenticated, PostsController.index);

// Post files form to server
// POST /san-pham/them-san-pham
router.post(
  "/them-san-pham",
  upload.array("files"),
  ensureAuthenticated,
  PostsController.upload
);

// /san-pham/:slug
router.get("/:slug", PostsController.single);

// Load Edit Form
// GET /san-pham/:id/edit
router.get("/:id/edit", ensureAuthenticated, PostsController.edit);

// Update
// PUT /san-pham/:id/edit
router.put("/:id/edit", ensureAuthenticated, PostsController.update);

// Delete Posts
// DELETE /san-pham/:id/delete
router.delete("/:id/delete", ensureAuthenticated, PostsController.delete);

// Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/auth/login");
  }
}

module.exports = router;
