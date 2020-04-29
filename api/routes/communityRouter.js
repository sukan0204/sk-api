var express = require("express");
var router = express.Router();
var post_controller = require("./../controllers/postController");

var index = function (req, res, next) {
  res.send("Welcome To Community API");
};

router.get("/", index);

router.get("/post/list", post_controller.list_post);

module.exports = router;
