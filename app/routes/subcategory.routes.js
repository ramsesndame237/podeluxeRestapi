module.exports = app => {
    const subcategorys = require("../controllers/subcategory.controller.js");
  
    var router = require("express").Router();
  
    // Create a new subcategorys
    router.post("/", subcategorys.create);
  
    // Retrieve all subcategorys
    router.get("/", subcategorys.findAll);
  
    // Retrieve a single subcategorys with id
    router.get("/:idSubcategory", subcategorys.findOne);
  
    // Update a subcategorys with id
    router.put("/:idSubcategory", subcategorys.update);
  
    // Delete a subcategorys with id
    router.delete("/:idSubcategory", subcategorys.delete);
  
    // Delete all subcategorys
    router.delete("/", subcategorys.deleteAll);
  
    app.use('/api/subcategory', router);
  };