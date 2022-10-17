module.exports = app => {
    const extras = require("../controllers/extra.controller.js");
  
    var router = require("express").Router();
  
    // Create a new extras
    router.post("/", extras.create);
  
    // Retrieve all extras
    router.get("/", extras.findAll);
  
    // Retrieve all published extras
    // router.get("/published", extras.findAllPublished);
  
    // Retrieve a single extras with id
    router.get("/:idExtra", extras.findOne);
  
    // Update a extras with id
    router.put("/:idExtra", extras.update);
  
    // Delete a extras with id
    router.delete("/:idExtra", extras.delete);
  
    // Delete all extras
    router.delete("/", extras.deleteAll);
  
    app.use('/api/extras', router);
  };