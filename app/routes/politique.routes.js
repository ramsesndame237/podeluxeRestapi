module.exports = app => {
    const politiques = require("../controllers/politique.controller.js");
  
    var router = require("express").Router();
  
    // Create a new politiques
    router.post("/", politiques.create);
  
    // Retrieve all politiques
    router.get("/", politiques.findAll);
  
    // Retrieve all published politiques
    // router.get("/published", politiques.findAllPublished);
  
    // Retrieve a single politiques with id
    router.get("/:idPolitique", politiques.findOne);
  
    // Update a politiques with id
    router.put("/:idPolitique", politiques.update);
  
    // Delete a politiques with id
    router.delete("/:idPolitique", politiques.delete);
  
    // Delete all politiques
    router.delete("/", politiques.deleteAll);
  
    app.use('/api/politique', router);
  };