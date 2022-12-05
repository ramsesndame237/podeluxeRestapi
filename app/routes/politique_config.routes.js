module.exports = app => {
    const politiques_config = require("../controllers/politique_config.controller.js");
  
    var router = require("express").Router();
  
    // Create a new politiques_config
    router.post("/", politiques_config.create);
  
    // Retrieve all politiques_config
    router.get("/", politiques_config.findAll);
  
    // Retrieve all published politiques_config
    // router.get("/published", politiques_config.findAllPublished);
  
    // Retrieve a single politiques_config with id
    router.get("/:idPolitiqueConfig", politiques_config.findOne);
  
    // Update a politiques_config with id
    router.put("/:idPolitiqueConfig", politiques_config.update);
  
    // Delete a politiques_config with id
    router.delete("/:idPolitiqueConfig", politiques_config.delete);
  
    // Delete all politiques_config
    router.delete("/", politiques_config.deleteAll);
  
    app.use('/api/politiqueConfig', router);
  };