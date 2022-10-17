const express = require("express");
const cors = require("cors");
const socket = require('socket.io')
const Sequelize = require('sequelize')

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
);
//force: true will drop the table if it already exists
app.get("/", (req, res) => {
  res.json({ message: "Welcome to asquid application." });
});
app.use("/static",express.static(__dirname+"/app/static/"))
// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/cut.routes')(app);
require('./app/routes/upload.routes')(app)
require('./app/routes/faq.routes')(app)
require("./app/routes/product.routes")(app)
require("./app/routes/size.routes")(app)
require("./app/routes/commande.routes")(app)
require("./app/routes/pannier.routes")(app)
require("./app/routes/upload.routes")(app)
require("./app/routes/client.routes")(app)

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