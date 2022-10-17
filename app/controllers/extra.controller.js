const db = require("../models");
const Extra = db.extra;
const Op = db.Sequelize.Op;
const base64Img = require('base64-img')

// Create and Save a new Extra
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    for (let i = 0; i < req.body.illustration.length; i++) {
      const refeEXtra = "IllustrationExtra"+ makeid(2)  , illustration = req.body.illustration[i]
       fs.writeFileSync(__dirname + '/../ressources/Extra/' +refeEXtra+'.json', JSON.stringify({illustration}))
    }

  
    // Create a Extra
    const extra = {
      nameExtra: req.body.nameExtra,
      image: req.body.image,
      illustration:refeEXtra
    };
      Extra.create(extra)
      .then(data =>   {
          res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the commande."
      });
    });


  
    // Save Extra in the database
   
  };

// Retrieve all extras from the database.
exports.findAll = (req, res) => {
  const nameExtra = req.query.nameExtra;
  var condition = nameExtra ? { nameExtra} : null;

  Extra.findAll({ where: condition })
    .then(data => {
      data = data.map(elt => elt.dataValues).map(elt => {
        const illus = fs.readFileSync(__dirname + '/../ressources/Extra/' + elt.illustration + '.json').toString('utf8')
        elt.illus = JSON.parse(illus).illustration
        return elt
      })
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving EXtra."
      });
    });
};

// Find a single Extra with an id
exports.findOne = (req, res) => {
    const idExtra = req.params.idExtra;
  
    Extra.findByPk(idExtra)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + idExtra
        });
      });
  };

// Update a Extra by the id in the request
exports.update = (req, res) => {
    const idExtra = req.params.idExtra;
  
    Extra.update(req.body, {
      where: { id: idExtra }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Extra was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Extra with id=${idExtra}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Extra with id=" + idExtra
        });
      });
  };

// Delete a Extra with the specified id in the request
exports.delete = (req, res) => {
    const idExtra = req.params.idExtra;
  
    Extra.destroy({
      where: { idExtra: idExtra }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Extra was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Extra with id=${idExtra}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Extra with id=" + idExtra
        });
      });
  };

// Delete all extras from the database.
exports.deleteAll = (req, res) => {
    Extra.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} extras were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all extras."
        });
      });
  };

// // Find all published extras
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