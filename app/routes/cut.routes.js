module.exports = app => {
    const cuts = require("../controllers/cut.controller.js");
  
    var router = require("express").Router();
  
    // Create a new cuts
    router.post("/", cuts.create);
  
    // Retrieve all cuts
    router.get("/", cuts.findAll);
  
    // Retrieve all published cuts
    // router.get("/published", cuts.findAllPublished);
  
    // Retrieve a single cuts with id
    router.get("/:idCut", cuts.findOne);
  
    // Update a cuts with id
    router.put("/:idCut", cuts.update);
  
    // Delete a cuts with id
    router.delete("/:idCut", cuts.delete);
  
    // Delete all cuts
    router.delete("/", cuts.deleteAll);
  
    app.use('/api/cuts', router);
  };