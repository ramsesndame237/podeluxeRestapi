

const db = require("../models");
const Avis = db.avis;
const Op = db.Sequelize.Op;

// Create and Save a new Avis
exports.create = (req, res) => {
    // Validate request
    if (!req.body.blocks && !req.body.time) {
      res.status(400).send({
        message: "Les données fournis sont incomplet!"
      });
      return;
    }
  
    // Create a Avis
    const avis = {
        blocks:req.body.blocks,
        type_justicy:req.body.type_justicy
    };
  
    // Save Avis in the database
    Avis.create(avis)
        .then(data =>  {
           res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:  
            err.message || "Une erreur interne à eu lieu."
        });
      });
  };

// Retrieve all Aviss from the database.
exports.findAll = (req, res) => {
    // const uuid = req.query.uuid;
    // var condition = uuid ? { uuid} : null;
  
    Avis.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Aviss."
        });
      });
  };

// Find a single Avis with an id
exports.findOne = (req, res) => {
    const uuid = req.params.uuid;
  
    Avis.findByPk(uuid)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Avis with id=" + uuid
        });
      });
  };

// Update a Avis by the id in the request
exports.update = (req, res) => {
    const uuid = req.params.uuid;
  
    Avis.update(req.body, {
      where: { uuid: uuid }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Avis was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Avis with id=${uuid}. Maybe Avis was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Avis with id=" + uuid
        });
      });
  };

// Delete a Avis with the specified id in the request
exports.delete = (req, res) => {
    const uuid = req.params.uuid;
  
    Avis.destroy({
      where: { uuid: uuid }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Avis was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Avis with id=${uuid}. Maybe Avis was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Avis with id=" + uuid
        });
      });
  };

// Delete all Aviss from the database.
exports.deleteAll = (req, res) => {
    Avis.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Aviss were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Aviss."
        });
      });
  };

// // Find all published Aviss
// exports.findAllPublished = (req, res) => {
  
// };