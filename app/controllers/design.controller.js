const db = require("../models");
const Design = db.design;
const Op = db.Sequelize.Op;
const base64Img = require('base64-img')

// Create and Save a new Design
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nameDesign) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    for (let i = 0; i < req.body.illustration.length; i++) {
      const refePanier = "IllustrationDesign"+ makeid(2)  , illustration = req.body.illustration[i]
       fs.writeFileSync(__dirname + '/../ressources/Design/' +refePanier+'.json', JSON.stringify({illustration}))
      
    }

  
    // Create a Design
    const design = {
      nameDesign: req.body.nameDesign,
      image: req.body.image,
      illustration:refePanier
    };
      Design.create(design)
      .then(data =>   {
          res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the commande."
      });
    });


  
    // Save Design in the database
   
  };

// Retrieve all designs from the database.
exports.findAll = (req, res) => {
  const nameDesign = req.query.nameDesign;
  var condition = nameDesign ? { nameDesign} : null;

  Design.findAll({ where: condition })
    .then(data => {
      data = data.map(elt => elt.dataValues).map(elt => {
        const illus = fs.readFileSync(__dirname + '/../ressources/Design/' + elt.illustration + '.json').toString('utf8')
        elt.illus = JSON.parse(illus).illustration
        return elt
      })
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Design."
      });
    });
};


// Find a single Design with an id
exports.findOne = (req, res) => {
    const idDesign = req.params.idDesign;
  
    Design.findByPk(idDesign)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + idDesign
        });
      });
  };

// Update a Design by the id in the request
exports.update = (req, res) => {
    const idDesign = req.params.idDesign;
  
    Design.update(req.body, {
      where: { id: idDesign }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Design was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Design with id=${idDesign}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Design with id=" + idDesign
        });
      });
  };

// Delete a Design with the specified id in the request
exports.delete = (req, res) => {
    const idDesign = req.params.idDesign;
  
    Design.destroy({
      where: { idDesign: idDesign }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Design was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Design with id=${idDesign}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Design with id=" + idDesign
        });
      });
  };

// Delete all designs from the database.
exports.deleteAll = (req, res) => {
    Design.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} designs were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all designs."
        });
      });
  };

// // Find all published designs
// exports.findAllPublished = (req, res) => {
  
// };

function makeid(length) {
    var result           = '';
    var characters       = 'abcdefghijklmnoprstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}