module.exports = app => {
    const reviews = require("../controllers/review.controller.js");
  
    var router = require("express").Router();
  
    // Create a new reviews
    router.post("/", reviews.create);
  
    // Retrieve all reviews
    router.get("/", reviews.findAll);
  
    // Retrieve all published reviews
    // router.get("/published", reviews.findAllPublished);
  
    // Retrieve a single reviews with id
    router.get("/:idReview", reviews.findOne);
  
    // Update a reviews with id
    router.put("/:idReview", reviews.update);
  
    // Delete a reviews with id
    router.delete("/:idReview", reviews.delete);
  
    // Delete all reviews
    router.delete("/", reviews.deleteAll);
  
    app.use('/api/review', router);
  };