const db = require("../models");
const Client = db.client;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.create = (req, res) => {
    // Validate request
    if (!req.body.email) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Client
    const client = {
        email: req.body.email,
        name:  req.body.name,
        lastName: req.body.lastName,
        companyName: req.body.companyName,
        tel1:req.body.te1 ,
        city:req.body.city ,
        state: req.body.state,
        country:req.body.country,
        postcode: req.body.postcode,
        brand: req.body.brand,
        model: req.body.model,
        years: req.body.years
    };
  
    // Save client in the database
    Client.create(client)
        .then(data =>  {
           res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the client."
        });
      });
  };

// Retrieve all Clients from the database.
exports.findAll = (req, res) => {
    const idClient = req.query.idClient;
    var condition = idClient ? { idClient} : null;
  
    Client.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving clients."
        });
      });
  };

// Find a single client with an id
exports.findOne = (req, res) => {
    const idClient = req.params.idClient;
  
    Client.findByPk(idClient)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving client with id=" + idClient
        });
      });
  };

// Update a client by the id in the request
exports.update = (req, res) => {
    const idClient = req.params.idClient;
  
    Client.update(req.body, {
      where: { id: idClient }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Client was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Client with id=${idClient}. Maybe Client was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Client with id=" + idClient
        });
      });
  };

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
    const idClient = req.params.idClient;
  
    Client.destroy({
      where: { idClient: idClient }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Client was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Client with id=${idClient}. Maybe Client was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Client with id=" + idClient
        });
      });
  };

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
    Client.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Clients were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Clients."
        });
      });
  };

// // Find all published Clients
// exports.findAllPublished = (req, res) => {
  
// };