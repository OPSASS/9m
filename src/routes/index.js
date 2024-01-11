const authRouter = require("./auth");
const postsRouter = require("./posts");
const usersRouter = require("./users");
const siteRouter = require("./site");

// use the express router
function Route(app) {
  app.use("/auth", authRouter);

  app.use("/san-pham", postsRouter);

  app.use("/profile", usersRouter);

  app.use("/", siteRouter);
}

module.exports = Route;
