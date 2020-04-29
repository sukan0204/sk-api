var Post = require("../models/post");

const { body, validationResult } = require("express-validator/check");

exports.list_post = [
  // Process request after validation and sanitization.
  (req, res, next) => {
    console.log(req.body);
    console.log("list post");
    return Post.find({}).exec(function (err, postList) {
      if (err) {
        return next(err);
      }

      return res.send(postList);
    });
  },
];
