module.exports = app => {
    const uploadController = require("../controllers/file.controller.js");
  
    var router = require("express").Router();
  
    // Create a new designs
    router.post("/", uploadController.upload);
    router.get("/files", uploadController.getListFiles);
    router.get("/files/:name", uploadController.download);
  
  
    app.use('/api/upload', router);
 };