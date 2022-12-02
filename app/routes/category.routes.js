module.exports = app => {
    const categorys = require("../controllers/category.controller.js");
  
    var router = require("express").Router();
  
    // Create a new categorys
    router.post("/", categorys.create);
  
    // Retrieve all categorys
    router.get("/", categorys.findAll);
  
    // Retrieve a single categorys with id
    router.get("/:idCategory", categorys.findOne);
  
    // Update a categorys with id
    router.put("/:idCategory", categorys.update);
  
    // Delete a categorys with id
    router.delete("/:idCategory", categorys.delete);
  
    // Delete all categorys
    router.delete("/", categorys.deleteAll);
  
    app.use('/api/category', router);
  };