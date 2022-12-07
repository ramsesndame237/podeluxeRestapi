

const db = require("../models");
const Faq = db.faq;
const Op = db.Sequelize.Op;

// Create and Save a new Faq
exports.create = (req, res) => {
    // Validate request
    if (!req.body.question && !req.body.reponse) {
      res.status(400).send({
        message: "Les données fournis sont incomplet!"
      });
      return;
    }
  
    // Create a Faq
    const faq = {
        question:req.body.question,
          reponse: req.body.reponse
    };
  
    // Save Faq in the database
    Faq.create(faq)
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

// Retrieve all Faqs from the database.
exports.findAll = (req, res) => {
    // const idFaq = req.query.idFaq;
    // var condition = idFaq ? { idFaq} : null;
  
    Faq.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Faqs."
        });
      });
  };

// Find a single Faq with an id
exports.findOne = (req, res) => {
    const idFaq = req.params.idFaq;
  
    Faq.findByPk(idFaq)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Faq with id=" + idFaq
        });
      });
  };

// Update a Faq by the id in the request
exports.update = (req, res) => {
    const idFaq = req.params.idFaq;
  
    Faq.update(req.body, {
      where: { idFaq: idFaq }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Faq was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Faq with id=${idFaq}. Maybe Faq was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Faq with id=" + idFaq
        });
      });
  };

// Delete a Faq with the specified id in the request
exports.delete = (req, res) => {
    const idFaq = req.params.idFaq;
  
    Faq.destroy({
      where: { idFaq: idFaq }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Faq was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Faq with id=${idFaq}. Maybe Faq was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Faq with id=" + idFaq
        });
      });
  };

// Delete all Faqs from the database.
exports.deleteAll = (req, res) => {
    Faq.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Faqs were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Faqs."
        });
      });
  };

// // Find all published Faqs
// exports.findAllPublished = (req, res) => {
  
// };