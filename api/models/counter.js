var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const counterModel = mongoose.model("counter", CounterSchema);

const autoIncrementModelId = function (modelName, doc, next) {
  counterModel.findByIdAndUpdate(
    modelName,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }, // The options
    function (error, counter) {
      // The callback
      if (error) return next(error);

      doc._id = counter.seq;
      next();
    }
  );
};

//Export model
module.exports = autoIncrementModelId;
