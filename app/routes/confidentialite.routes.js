module.exports = app => {
    const confidentialite = require("../controllers/politique_config.controller.js");
  
    var router = require("express").Router();
  
    // Create a new confidentialite
    router.post("/", confidentialite.create);
  
    // Retrieve all confidentialite
    router.get("/", confidentialite.findAll);
  
  
    // Retrieve a single confidentialite with id
    router.get("/:uuid", confidentialite.findOne);
  
    // Update a confidentialite with id
    router.put("/:uuid", confidentialite.update);
  
    // Delete a confidentialite with id
    router.delete("/:uuid", confidentialite.delete);
  
    // Delete all confidentialite
    router.delete("/", confidentialite.deleteAll);
  
    app.use('/api/confidentialite', router);
  };