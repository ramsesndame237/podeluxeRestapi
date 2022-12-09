

const db = require("../models");
const About = db.about;
const Op = db.Sequelize.Op;

// Create and Save a new About
exports.create = (req, res) => {
    // Validate request
    if (!req.body.blocks && !req.body.type_justicy) {
      res.status(400).send({
        message: "Les données fournis sont incomplet!"
      });
      return;
    }
  
    // Create a About
    const about = {
        blocks:req.body.blocks,
        type_justicy:req.body.type_justicy
    };
  
    // Save About in the database
    About.create(about)
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

// Retrieve all Abouts from the database.
exports.findAll = (req, res) => {
    About.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Abouts."
        });
      });
  };

// Find a single About with an id
exports.findOne = (req, res) => {
    const uuid = req.params.uuid;
  
    About.findByPk(uuid)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving About with id=" + uuid
        });
      });
  };

// Update a About by the id in the request
exports.update = (req, res) => {
    const uuid = req.params.uuid;
  
    About.update(req.body, {
      where: { uuid: uuid }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "About was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update About with id=${uuid}. Maybe About was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating About with id=" + uuid
        });
      });
  };

// Delete a About with the specified id in the request
exports.delete = (req, res) => {
    const uuid = req.params.uuid;
  
    About.destroy({
      where: { uuid: uuid }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "About was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete About with id=${uuid}. Maybe About was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete About with id=" + uuid
        });
      });
  };

// Delete all Abouts from the database.
exports.deleteAll = (req, res) => {
    About.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Abouts were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Abouts."
        });
      });
  };
