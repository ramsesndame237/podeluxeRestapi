const db = require("../models");
const Faq = db.faq;
const responseFaq=db.responseFaq
const Op = db.Sequelize.Op;

// Create and Save a new faq
exports.create = (req, res) => {
    // Validate request
    if (!req.body.questionFaq) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Faq
    const faq = {
      questionFaq: req.body.questionFaq,
      image: req.body.image,
    };
    let data = {
      response:req.body.responseFaqs || []
    }
  
    // Save Faq in the database
    Faq.create(faq)
        .then(data => async () =>  {
             if (req.body.responseFaqs.length) {
        await db.responseFaq.bulkCreate(
            req.body.responseFaqs.map(response => {
                return {
                    reponseFaq: response.reponseFaq,
                    image:response.image,
                    idFaq: data.idFaq,
                }
            })
        )
    }
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Faq."
        });
      });
  };

// Retrieve all Faqs from the database.
exports.findAll = (req, res) => {
    const questionFaq = req.query.questionFaq;
    var condition = questionFaq ? { questionFaq: { [Op.like]: `%${questionFaq}%` } } : null;
  
    Faq.findAll({ where: condition })
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
          message: "Error retrieving Tutorial with id=" + idFaq
        });
      });
  };

// Update a Faq by the id in the request
exports.update = (req, res) => {
    const idFaq = req.params.idFaq;
  
    Faq.update(req.body, {
      where: { id: idFaq }
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