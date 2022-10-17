const db = require("../models");
const Size = db.size;
const Op = db.Sequelize.Op;

// Create and Save a new Size
exports.create = (req, res) => {
   
   // Validate request
   if (!req.body.nameSize) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Size
  const size = {
    nameSize: req.body.nameSize,
    image: req.body.image,
    dimension:req.body.dimension,
    nameWithProduct:req.body.nameWithProduct
  };


  // Save Size in the database
  Size.create(size)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Size."
      });
    });
};
  

// Retrieve all Sizes from the database.
exports.findAll = (req, res) => {
  const nameSize = req.query.nameSize;
  var condition = nameSize ? { nameSize: { [Op.like]: `%${nameSize}%` } } : null;

  Size.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sizes."
      });
    });
};

// Find a single Size with an id
exports.findOne = (req, res) => {
  const idSize = req.params.idSize;

  Size.findByPk(idSize)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Size with id=${idSize}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Size with id=" + id
      });
    });
};

// Update a Size by the id in the request
exports.update = (req, res) => {
  const idSize = req.params.idSize;

  Size.update(req.body, {
    where: { idSize: idSize }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Size was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Size with id=${id}. Maybe Size was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Size with id=" + idSize
      });
    });
};
// Delete a Size with the specified id in the request
exports.delete = (req, res) => {
  const idSize = req.params.idSize;

  Size.destroy({
    where: { idSize: idSize }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Size was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Size with idSize=${idSize}. Maybe Size was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Size with idSize=" + idSize
      });
    });
};

// Delete all Sizes from the database.
exports.deleteAll = (req, res) => {
  Size.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Sizes were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all sizes."
      });
    });
};

// Find all published Sizes
exports.findAllPublished = (req, res) => {
  
};