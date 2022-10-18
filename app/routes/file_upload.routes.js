module.exports = app => {
    const file_upload = require("../controllers/file_upload.controller.js");
  
    var router = require("express").Router();
  
    // Create a new clients
    router.post("/", file_upload.uploadFile);

    app.use('/api/upload', router);
  };