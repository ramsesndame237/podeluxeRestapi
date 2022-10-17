const db = require("../models");
const Cut = db.cut;
const Op = db.Sequelize.Op;

// Create and Save a new Cut
exports.create = (req, res) => {
   
   // Validate request
   if (!req.body.nameCut) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Cut
  const cut = {
    nameCut: req.body.nameCut,
    image: req.body.image,
  };


  // Save Cut in the database
  Cut.create(cut)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cut."
      });
    });
};
  

// Retrieve all Cuts from the database.
exports.findAll = (req, res) => {
  const nameCut = req.query.nameCut;
  var condition = nameCut ? { nameCut: { [Op.like]: `%${nameCut}%` } } : null;

  Cut.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cuts."
      });
    });
};

// Find a single Cut with an id
exports.findOne = (req, res) => {
  const idCut = req.params.idCut;

  Cut.findByPk(idCut)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Cut with id=${idCut}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Cut with id=" + id
      });
    });
};

// Update a Cut by the id in the request
exports.update = (req, res) => {
  const idCut = req.params.idCut;

  Cut.update(req.body, {
    where: { idCut: idCut }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cut was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Cut with id=${id}. Maybe Cut was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Cut with id=" + idCut
      });
    });
};
// Delete a Cut with the specified id in the request
exports.delete = (req, res) => {
  const idCut = req.params.idCut;

  Cut.destroy({
    where: { idCut: idCut }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cut was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Cut with idCut=${idCut}. Maybe Cut was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Cut with idCut=" + idCut
      });
    });
};

// Delete all Cuts from the database.
exports.deleteAll = (req, res) => {
  Cut.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Cuts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cuts."
      });
    });
};

// Find all published Cuts
exports.findAllPublished = (req, res) => {
  
};