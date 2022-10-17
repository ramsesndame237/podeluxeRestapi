module.exports = app => {
    const Products = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Products
    router.post("/", Products.create);
  
    // Retrieve all Products
    router.get("/", Products.findAll);
  
    // Retrieve all published Products
    // router.get("/published", Products.findAllPublished);
  
    // Retrieve a single Products with id
    router.get("/:idProduct", Products.findOne);
  
    // Update a Products with id
    router.put("/:idProduct", Products.update);
  
    // Delete a Products with id
    router.delete("/:idProduct", Products.delete);
  
    // Delete all Products
    router.delete("/", Products.deleteAll);
  
    app.use('/api/products', router);
  };