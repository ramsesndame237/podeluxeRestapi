module.exports = app => {
    const file_upload = require("../controllers/file_upload.controller.js");
  
    var router = require("express").Router();
    router.post("/", file_upload.upload);
    router.get("/files", file_upload.getListFiles);
    router.get("/files/:name", file_upload.download);

    app.use('/api/upload', router);
  };