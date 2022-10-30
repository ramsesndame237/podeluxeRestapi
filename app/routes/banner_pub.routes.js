module.exports = app => {
    const bannerpubs = require("../controllers/bannerPub.controller");
  
    var router = require("express").Router();
  
    // Create a new bannerpubs
    router.post("/", bannerpubs.create);
  
    // Retrieve all bannerpubs
    router.get("/", bannerpubs.findAll);
  
    // Retrieve a single bannerpubs with id
    router.get("/:idBanner", bannerpubs.findOne);
  
    // Update a bannerpubs with id
    router.put("/:idBanner", bannerpubs.update);
  
    // Delete a bannerpubs with id
    router.delete("/:idBanner", bannerpubs.delete);
  
    // Delete all bannerpubs
    router.delete("/", bannerpubs.deleteAll);
  
    app.use('/api/banner', router);
  };