

const db = require("../models");
const Politique = db.politique;
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
    Politique.create(politique)
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
    // const idPolitique = req.query.idPolitique;
    // var condition = idPolitique ? { idPolitique} : null;
  
    Politique.findAll()
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
    const idPolitique = req.params.idPolitique;
  
    Politique.findByPk(idPolitique)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Politique with id=" + idPolitique
        });
      });
  };

// Update a Politique by the id in the request
exports.update = (req, res) => {
    const idPolitique = req.params.idPolitique;
  
    Politique.update(req.body, {
      where: { id: idPolitique }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Politique was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Politique with id=${idPolitique}. Maybe Politique was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Politique with id=" + idPolitique
        });
      });
  };

// Delete a Politique with the specified id in the request
exports.delete = (req, res) => {
    const idPolitique = req.params.idPolitique;
  
    Politique.destroy({
      where: { idPolitique: idPolitique }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Politique was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Politique with id=${idPolitique}. Maybe Politique was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Politique with id=" + idPolitique
        });
      });
  };

// Delete all Politiques from the database.
exports.deleteAll = (req, res) => {
    Politique.destroy({
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