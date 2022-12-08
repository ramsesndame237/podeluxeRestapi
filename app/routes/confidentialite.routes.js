module.exports = app => {
    const confidentialite = require("../controllers/politique_config.controller.js");
  
    var router = require("express").Router();
  
    // Create a new politiques_config
    router.post("/", politiques_config.create);
  
    // Retrieve all politiques_config
    router.get("/", politiques_config.findAll);
  
  
    // Retrieve a single politiques_config with id
    router.get("/:uuid", politiques_config.findOne);
  
    // Update a politiques_config with id
    router.put("/:uuid", politiques_config.update);
  
    // Delete a politiques_config with id
    router.delete("/:uuid", politiques_config.delete);
  
    // Delete all politiques_config
    router.delete("/", politiques_config.deleteAll);
  
    app.use('/api/politiqueConfig', router);
  };