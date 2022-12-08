module.exports = app => {
    const politiques = require("../controllers/politique_livraison.controller.js");
  
    var router = require("express").Router();
  
    // Create a new politiques
    router.post("/", politiques.create);
  
    // Retrieve all politiques
    router.get("/", politiques.findAll);
  
    // Retrieve all published politiques
    // router.get("/published", politiques.findAllPublished);
  
    // Retrieve a single politiques with id
    router.get("/:uuid", politiques.findOne);
  
    // Update a politiques with id
    router.put("/:uuid", politiques.update);
  
    // Delete a politiques with id
    router.delete("/:uuid", politiques.delete);
  
    // Delete all politiques
    router.delete("/", politiques.deleteAll);
  
    app.use('/api/politique_livraison', router);
  };