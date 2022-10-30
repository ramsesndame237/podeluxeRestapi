

const db = require("../models");
const BannerPub = db.bannerPub;
const Op = db.Sequelize.Op;

// Create and Save a new BannerPub
exports.create = (req, res) => {
    // Validate request
    if (!req.body.tile && !req.body.imageUrl) {
      res.status(400).send({
        message: "Les données fournis sont incomplet!"
      });
      return;
    }
  
    // Create a BannerPub
    const banner_pub = {
        title:req.body.title,
          description:req.body.description,
          imageUrl:req.body.imageUrl,
    };
  
    // Save BannerPub in the database
    BannerPub.create(banner_pub)
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

// Retrieve all BannerPubs from the database.
exports.findAll = (req, res) => {
    // const idBannerPub = req.query.idBannerPub;
    // var condition = idBannerPub ? { idBannerPub} : null;
  
    BannerPub.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving BannerPubs."
        });
      });
  };

// Find a single BannerPub with an id
exports.findOne = (req, res) => {
    const idBannerPub = req.params.idBannerPub;
  
    BannerPub.findByPk(idBannerPub)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving BannerPub with id=" + idBannerPub
        });
      });
  };

// Update a BannerPub by the id in the request
exports.update = (req, res) => {
    const idBannerPub = req.params.idBannerPub;
  
    BannerPub.update(req.body, {
      where: { id: idBannerPub }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "BannerPub was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update BannerPub with id=${idBannerPub}. Maybe BannerPub was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating BannerPub with id=" + idBannerPub
        });
      });
  };

// Delete a BannerPub with the specified id in the request
exports.delete = (req, res) => {
    const idBannerPub = req.params.idBannerPub;
  
    BannerPub.destroy({
      where: { idBannerPub: idBannerPub }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "BannerPub was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete BannerPub with id=${idBannerPub}. Maybe BannerPub was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete BannerPub with id=" + idBannerPub
        });
      });
  };

// Delete all BannerPubs from the database.
exports.deleteAll = (req, res) => {
    BannerPub.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} BannerPubs were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all BannerPubs."
        });
      });
  };

// // Find all published BannerPubs
// exports.findAllPublished = (req, res) => {
  
// };