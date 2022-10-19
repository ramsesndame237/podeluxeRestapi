

const db = require("../models");
const Review = db.review;
const Op = db.Sequelize.Op;

// Create and Save a new Review
exports.create = (req, res) => {
    // Validate request
    if (!req.body.client_name) {
      res.status(400).send({
        message: "Les données fournis sont incomplet!"
      });
      return;
    }
  
    // Create a Review
    const review = {
        imageUrlBefore: req.body.imageUrlBefore,
          imageUrlAfter: req.body.imageUrlAfter,
          review_description:req.body.review_description,
          client_email: req.body.client_email,
          client_name: req.body.client_name,
          idProduct:req.body.idProduct
    };
  
    // Save Review in the database
    Review.create(review)
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

// Retrieve all Reviews from the database.
exports.findAll = (req, res) => {
    // const idReview = req.query.idReview;
    // var condition = idReview ? { idReview} : null;
  
    Review.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Reviews."
        });
      });
  };

// Find a single Review with an id
exports.findOne = (req, res) => {
    const idReview = req.params.idReview;
  
    Review.findByPk(idReview)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Review with id=" + idReview
        });
      });
  };

// Update a Review by the id in the request
exports.update = (req, res) => {
    const idReview = req.params.idReview;
  
    Review.update(req.body, {
      where: { id: idReview }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Review was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Review with id=${idReview}. Maybe Review was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Review with id=" + idReview
        });
      });
  };

// Delete a Review with the specified id in the request
exports.delete = (req, res) => {
    const idReview = req.params.idReview;
  
    Review.destroy({
      where: { idReview: idReview }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Review was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Review with id=${idReview}. Maybe Review was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Review with id=" + idReview
        });
      });
  };

// Delete all Reviews from the database.
exports.deleteAll = (req, res) => {
    Review.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Reviews were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Reviews."
        });
      });
  };

// // Find all published Reviews
// exports.findAllPublished = (req, res) => {
  
// };