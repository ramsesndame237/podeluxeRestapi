module.exports = app => {
    const transaction = require("../controllers/commande.controller.js");
  
    var router = require("express").Router();
  
    // Create a new transaction
    router.post("/", transaction.create);
  
    // Retrieve all transaction
    router.get("/", transaction.findAll);
  
    // Retrieve all published transaction
    // router.get("/published", transaction.findAllPublished);
  
    // Retrieve a single transaction with id
    router.get("/:idTransaction", transaction.findOne);
  
    // Update a transaction with id
    router.put("/:idTransaction", transaction.update);
  
    // Delete a transaction with id
    router.delete("/:idTransaction", transaction.delete);
  
    // Delete all transaction
    router.delete("/", transaction.deleteAll);
  
    app.use('/api/transaction', router); 
  };