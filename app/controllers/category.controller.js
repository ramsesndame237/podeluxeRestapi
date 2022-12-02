

const db = require("../models");
const Category = db.category;
const Op = db.Sequelize.Op;

// Create and Save a new Category
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name && !req.body.code) {
      res.status(400).send({
        message: "Les données fournis sont incomplet!"
      });
      return;
    }
  
    // Create a Category
    const category = {
        name:req.body.name,
          code: req.body.code
    };
  
    // Save Category in the database
    Category.create(category)
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
  
    Category.findAll()
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

// Find a single Category with an id
exports.findOne = (req, res) => {
    const idCategory = req.params.idCategory;
  
    Category.findByPk(idCategory)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Category with id=" + idCategory
        });
      });
  };

// Update a Category by the id in the request
exports.update = (req, res) => {
    const idCategory = req.params.idCategory;
    console.log("this is the body",req.body)
  
    Category.update(req.body, {
      where: { idCategory: idCategory }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was updated successfully." 
          });
        } else {
          res.send({
            message: `Cannot update Category with id=${idCategory}. Maybe Category was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Category with id=" + idCategory
        });
      });
  };

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
    const idCategory = req.params.idCategory;
  
    Category.destroy({
      where: { idCategory: idCategory }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Category with id=${idCategory}. Maybe Category was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Category with id=" + idCategory
        });
      });
  };

// Delete all Categorys from the database.
exports.deleteAll = (req, res) => {
    Category.destroy({
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