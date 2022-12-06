

const db = require("../models");
const PolitiqueConfig = db.politiqueConfig;
const Op = db.Sequelize.Op;

// Create and Save a new Politique
exports.create = (req, res) => {
    // Validate request
    if (!req.body.blocks && !req.body.time) {
      res.status(400).send({
        message: "Les données fournis sont incomplet!"
      });
      return;
    }
  
    // Create a Politique
    const politique = {
        blocks:req.body.blocks,
        type_justicy:req.body.type_justicy
    };
  
    // Save Politique in the database
    PolitiqueConfig.create(politique)
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

// Retrieve all Politiques from the database.
exports.findAll = (req, res) => {
    // const uuid = req.query.uuid;
    // var condition = uuid ? { uuid} : null;
  
    PolitiqueConfig.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Politiques."
        });
      });
  };

// Find a single Politique with an id
exports.findOne = (req, res) => {
    const uuid = req.params.uuid;
  
    PolitiqueConfig.findByPk(uuid)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Politique with id=" + uuid
        });
      });
  };

// Update a Politique by the id in the request
exports.update = (req, res) => {
    const uuid = req.params.uuid;
  
    PolitiqueConfig.update(req.body, {
      where: { id: uuid }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Politique was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Politique with id=${uuid}. Maybe Politique was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Politique with id=" + uuid
        });
      });
  };

// Delete a Politique with the specified id in the request
exports.delete = (req, res) => {
    const uuid = req.params.uuid;
  
    PolitiqueConfig.destroy({
      where: { uuid: uuid }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Politique was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Politique with id=${uuid}. Maybe Politique was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Politique with id=" + uuid
        });
      });
  };

// Delete all Politiques from the database.
exports.deleteAll = (req, res) => {
    PolitiqueConfig.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Politiques were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Politiques."
        });
      });
  };

// // Find all published Politiques
// exports.findAllPublished = (req, res) => {
  
// };