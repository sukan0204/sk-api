var mongoose = require("mongoose");

const autoIncrementModelId = require("./counter");

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  _id: { type: Number, unique: true, min: 1 },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

PostSchema.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelId("post", this, next);
});

//Export model
module.exports = mongoose.model("Post", PostSchema);
