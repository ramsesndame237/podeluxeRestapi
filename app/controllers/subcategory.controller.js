

const db = require("../models");
const SubCategory = db.subcategory;
const Op = db.Sequelize.Op;

// Create and Save a new SubCategory
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.idCategory) {
      res.status(400).send({
        message: "Les données fournis sont incomplet!" 
      });
      return;
    }
  
    // Create a SubCategory
    const subcategory = {
        name:req.body.name,
        code: req.body.code,
        idCategory:req.body.idCategory
    };
  
    // Save SubCategory in the database
    SubCategory.create(subcategory)
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

// Retrieve all Categorys from the database.
exports.findAll = (req, res) => {
    // const idCategory = req.query.idCategory;
    // var condition = idCategory ? { idCategory} : null;
  
    SubCategory.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Categorys."
        });
      });
  };

// Find a single SubCategory with an id
exports.findOne = (req, res) => {
    const idCategory = req.params.idCategory;
  
    SubCategory.findByPk(idCategory)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving SubCategory with id=" + idCategory
        });
      });
  };

// Update a SubCategory by the id in the request
exports.update = (req, res) => {
    const idCategory = req.params.idCategory;
  
    SubCategory.update(req.body, {
      where: { id: idCategory }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "SubCategory was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update SubCategory with id=${idCategory}. Maybe SubCategory was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating SubCategory with id=" + idCategory
        });
      });
  };

// Delete a SubCategory with the specified id in the request
exports.delete = (req, res) => {
    const idCategory = req.params.idCategory;
  
    SubCategory.destroy({
      where: { idCategory: idCategory }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "SubCategory was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete SubCategory with id=${idCategory}. Maybe SubCategory was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete SubCategory with id=" + idCategory
        });
      });
  };

// Delete all Categorys from the database.
exports.deleteAll = (req, res) => {
    SubCategory.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Categorys were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Categorys."
        });
      });
  };

// // Find all published Categorys
// exports.findAllPublished = (req, res) => {
  
// };