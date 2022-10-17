module.exports = app => {
    const clients = require("../controllers/client.controller.js");
  
    var router = require("express").Router();
  
    // Create a new clients
    router.post("/", clients.create);
  
    // Retrieve all clients
    router.get("/", clients.findAll);
  
    // Retrieve all published clients
    // router.get("/published", clients.findAllPublished);
  
    // Retrieve a single clients with id
    router.get("/:idClient", clients.findOne);
  
    // Update a clients with id
    router.put("/:idClient", clients.update);
  
    // Delete a clients with id
    router.delete("/:idClient", clients.delete);
  
    // Delete all clients
    router.delete("/", clients.deleteAll);
  
    app.use('/api/clients', router);
  };