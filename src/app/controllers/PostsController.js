const e = require("connect-flash");
const { Posts } = require("../models/Posts");
const { User } = require("../models/User");

class PostsControler {
  index = async (req, res) => {
    res.render("pages/upload", {
      title: "Thêm sản phẩm",
    });
  };

  upload = async (req, res, next) => {
    try {
      const filesArray = [];
      req.files.forEach((e) => {
        const file = {
          fileName: e.filename,
          originalName: e.originalname,
          path: e.path,
          size: e.size,
        };
        filesArray.push(file);
      });
      const newPost = new Posts({ ...req.body, files: filesArray });

      await newPost.save();
      res.redirect("/");
      console.log(newPost, files); // show post
    } catch (error) {
      next(error);
    }
  };

  single = async (req, res, next) => {
    try {
      const posts = await Posts.find({ slug: req.params.slug });

      if (posts?.length == 0) {
        res.render("pages/404/404", {
          title: "404",
        });
      } else {
        res.render("pages/single-post", {
          title: posts.name,
          posts,
        });
      }
    } catch {
      next(error);
      res.redirect("/404");
    }
  };

  edit = async (req, res, next) => {
    try {
      const post = await Posts.findById(req.params.id);
      res.render("pages/edit", {
        title: "Sửa tin",
        post,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
      res.redirect("/san-pham/" + post.slug);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      await Posts.findByIdAndDelete(req.params.id);
      console.log("Post deleted!");
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new PostsControler();
