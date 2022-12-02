const express = require("express");
const cors = require("cors");
const socket = require('socket.io')
const Sequelize = require('sequelize')
const fileUpload = require("express-fileupload");



const app = express();

const http = require('http').Server(app)
const corsOptions = {
  origin: "*"
};
const io = socket(http)
const Op = Sequelize.Op

app.use((req, res, next) => {
  req.Op = Op
  res.io = io
  next()
});

app.use(cors(corsOptions));

// parse requests of content-type - application/json
// app.use(express.json());
app.use(express.json({limit: '50mb'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({limit: '50mb',extended: true }));
// app.use(express.urlencoded({ extended: true }));
global.__basedir = __dirname;
// database
const db = require("./app/models");
const Role = db.role;
const Size = db.size;

db.sequelize.sync(
  // initial()
   
);

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));
//force: true will drop the table if it already exists
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to podeluxe application." });
  });
app.use("/static",express.static(__dirname+"/app/static/"))
// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/file_upload.routes')(app)
require("./app/routes/product.routes")(app)
require("./app/routes/client.routes")(app)
require("./app/routes/review.routes")(app)
require("./app/routes/transaction.routes")(app)
require("./app/routes/faq.routes")(app)
require("./app/routes/banner_pub.routes")(app)
require("./app/routes/file_upload.routes")(app)
require("./app/routes/category.routes")(app)
require("./app/routes/subcategory.routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
 
function initial() {
  Role.create({
    id: 1,
    name: "client"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}