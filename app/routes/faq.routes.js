module.exports = app => {
    const faqs = require("../controllers/faq.controller.js");
  
    var router = require("express").Router();
  
    // Create a new faqs
    router.post("/", faqs.create);
  
    // Retrieve all faqs
    router.get("/", faqs.findAll);
  
    // Retrieve a single faqs with id
    router.get("/:idFaq", faqs.findOne);
  
    // Update a faqs with id
    router.put("/:idFaq", faqs.update);
  
    // Delete a faqs with id
    router.delete("/:idFaq", faqs.delete);
  
    // Delete all faqs
    router.delete("/", faqs.deleteAll);
  
    app.use('/api/faq', router);
  };