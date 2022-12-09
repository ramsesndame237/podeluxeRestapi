module.exports = app => {
    const about = require("../controllers/about.controller.js");
  
    var router = require("express").Router();
  
    // Create a new about
    router.post("/", about.create);
  
    // Retrieve all about
    router.get("/", about.findAll);
  
   
    // Retrieve a single about with id
    router.get("/:uuid", about.findOne);
  
    // Update a about with id
    router.put("/:uuid", about.update);
  
    // Delete a about with id
    router.delete("/:uuid", about.delete);
  
    // Delete all about
    router.delete("/", about.deleteAll);
  
    app.use('/api/about', router);
  }; 