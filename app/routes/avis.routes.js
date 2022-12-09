module.exports = app => {
    const avis = require("../controllers/avis.controller.js");
  
    var router = require("express").Router();
  
    // Create a new avis
    router.post("/", avis.create);
  
    // Retrieve all avis
    router.get("/", avis.findAll);
  
   
    // Retrieve a single avis with id
    router.get("/:uuid", avis.findOne);
  
    // Update a avis with id
    router.put("/:uuid", avis.update);
  
    // Delete a avis with id
    router.delete("/:uuid", avis.delete);
  
    // Delete all avis
    router.delete("/", avis.deleteAll);
  
    app.use('/api/avis', router);
  }; 