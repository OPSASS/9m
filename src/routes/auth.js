const router = require("express").Router();
const authController = require("../app/controllers/AuthController");

// [GET]
// /auth/register
router.get("/register", authController.register);
// /auth/login
router.get("/login", authController.login);
// /auth/reset
router.get("/reset", authController.reset);

router.get("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

// [POST]
// Register Proccess
router.post("/register", authController.registerProcess);

// Login Process
router.post("/login", authController.loginProcess);

// Reset password process
router.post("/reset", authController.resetProcess);

// /auth/logout
module.exports = router;
