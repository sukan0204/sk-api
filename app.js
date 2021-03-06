"use strict";

var SwaggerExpress = require("swagger-express-mw");
var app = require("express")();
module.exports = app; // for testing

var config = {
  appRoot: __dirname, // required config
};

const YAML = require("yamljs");

//Set up mongoose connection
var mongoose = require("mongoose");
var mongoDB = "mongodb+srv://admin:0204@cluster0-cruyt.azure.mongodb.net/test";
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// routes
var communityRouter = require("./api/routes/communityRouter");
app.use("/community", communityRouter);

var swaggerUi = require("swagger-ui-express"),
  swaggerDocument = YAML.load("./api/swagger/swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths["/hello"]) {
    console.log(
      "try this:\ncurl http://127.0.0.1:" + port + "/hello?name=Scott"
    );
  }
});
