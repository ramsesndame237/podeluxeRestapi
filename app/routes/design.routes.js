module.exports = app => {
    const designs = require("../controllers/design.controller.js");
  
    var router = require("express").Router();
  
    // Create a new designs
    router.post("/", designs.create);
  
    // Retrieve all designs
    router.get("/", designs.findAll);
  
    // Retrieve all published designs
    // router.get("/published", designs.findAllPublished);
  
    // Retrieve a single designs with id
    router.get("/:idDesign", designs.findOne);
  
    // Update a designs with id
    router.put("/:idDesign", designs.update);
  
    // Delete a designs with id
    router.delete("/:idDesign", designs.delete);
  
    // Delete all designs
    router.delete("/", designs.deleteAll);
  
    app.use('/api/designs', router);
 };