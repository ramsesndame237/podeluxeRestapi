module.exports = app => {
    const products = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  
    // Create a new products
    router.post("/", products.create);
  
    // Retrieve all products
    router.get("/", products.findAll);
  
    // Retrieve all published products
    // router.get("/published", products.findAllPublished);
  
    // Retrieve a single products with id
    router.get("/:idProduct", products.findOne);
  
    // Update a products with id
    router.put("/:idProduct", products.update);
  
    // Delete a products with id
    router.delete("/:idProduct", products.delete);
  
    // Delete all products
    router.delete("/", products.deleteAll);
  
    app.use('/api/product', router);
  };