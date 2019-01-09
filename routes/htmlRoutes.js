var db = require("../models");
var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  //login route
  // app.get("/login", function(req, res) {
  //   res.render("login");
  // });
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      // res.redirect("/members");
      res.render("index");
    } else {
      res.render("sign");
    }
    // res.sendFile(path.join(__dirname, "../public/signup.html"));

  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("login");
  });
  //post an item route
  app.get("/post", function(req, res) {
    res.render("post");
  });
  //get an item route
  app.get("/get", function(req, res) {
    db.Favor.findAll().then(function(result) {
      res.render("get", {
        AllFavors: result
      });
    });
  });


  /// ORIGINAL HTML ROUTES
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("login", {
        // msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });


  app.get("/members", isAuthenticated, function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/members.html"));
    res.render("index");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
