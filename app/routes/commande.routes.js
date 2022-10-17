module.exports = app => {
    const commandes = require("../controllers/commande.controller.js");
  
    var router = require("express").Router();
  
    // Create a new commandes
    router.post("/", commandes.create);
  
    // Retrieve all commandes
    router.get("/", commandes.findAll);
  
    // Retrieve all published commandes
    // router.get("/published", commandes.findAllPublished);
  
    // Retrieve a single commandes with id
    router.get("/:idCommande", commandes.findOne);
  
    // Update a commandes with id
    router.put("/:idCommande", commandes.update);
  
    // Delete a commandes with id
    router.delete("/:idCommande", commandes.delete);
  
    // Delete all commandes
    router.delete("/", commandes.deleteAll);
  
    app.use('/api/commandes', router);
  };