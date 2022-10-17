module.exports = app => {
    const sizes = require("../controllers/size.controller.js");
  
    var router = require("express").Router();
  
    // Create a new sizes
    router.post("/", sizes.create);
  
    // Retrieve all sizes
    router.get("/", sizes.findAll);
  
    // Retrieve all published sizes
    // router.get("/published", sizes.findAllPublished);
  
    // Retrieve a single sizes with id
    router.get("/:idSize", sizes.findOne);
  
    // Update a sizes with id
    router.put("/:idSize", sizes.update);
  
    // Delete a sizes with id
    router.delete("/:idSize", sizes.delete);
  
    // Delete all sizes
    router.delete("/", sizes.deleteAll);
  
    app.use('/api/sizes', router);
  };