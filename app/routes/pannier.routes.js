module.exports = app => {
    const panniers = require("../controllers/pannier.controller.js");
  
    var router = require("express").Router();
  
    // Create a new panniers
    router.post("/", panniers.create);
  
    // Retrieve all panniers
  router.get("/", panniers.findAll);
  // Retrieve all panniers of user
    router.get("/:idUser", panniers.findAllPannier);
  
    // Retrieve all published panniers
    // router.get("/published", panniers.findAllPublished);
  
    // Retrieve a single panniers with id
    router.get("/:idPannier", panniers.findOne);
  
    // Update a panniers with id
    router.put("/:idPannier", panniers.update);
  
    // Delete a panniers with id
    router.delete("/:idPannier", panniers.delete);
  
    // Delete all panniers
    router.delete("/", panniers.deleteAll);
  
    app.use('/api/panniers', router);
  };