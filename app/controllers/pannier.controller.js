const db = require("../models");
const Pannier=db.pannier
const Op = db.Sequelize.Op;
const fs = require('fs')

// Create and Save a new faq
exports.create = (req, res) => {
    // Validate request
    if (!req.body.ProduitCommande) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  const refePanier = "pannierVisuel"+ makeid(2)  , visuelCommande = req.body.visuelCommande
  
    fs.writeFileSync(__dirname + '/../ressources/Visual/' +refePanier+'.json', JSON.stringify({visuelCommande}))


     // Create a commande
    const pannier = {
        ProduitCommande: req.body.ProduitCommande,
        amountCommande: req.body.amountCommande,
        statutCommande: req.body.statutCommande,
        sizeCommande: req.body.sizeCommande,
        cutCommande: req.body.cutCommande,
        ExtraCommande: req.body.ExtraCommande,
        designCommande: req.body.designCommande,
        quantityCommande: req.body.quantityCommande,
        visuelCommande: refePanier,
        idUser:req.body.idUser 
    };
  
  
    // Save pannier in the database
    Pannier.create(pannier)
        .then(data =>   {
            res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the commande."
        });
      });
  };

// Retrieve all commandes from the database.
exports.findAll = (req, res) => {
    const idUser = req.query.idUser;
    var condition = idUser ? { idUser} : null;
  
    Pannier.findAll({ where: condition })
      .then(data => {
        data = data.map(elt => elt.dataValues).map(elt => {
          const visuel = fs.readFileSync(__dirname + '/../ressources/Visual/' + elt.visuelCommande + '.json').toString('utf8')
          elt.visuel = JSON.parse(visuel).visuelCommande
          return elt
        })


        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving commandes."
        });
      });
};
  // Retrieve all commandes from the database.
exports.findAllPannier = (req, res) => {
    const idUser = req.params.idUser;
  
    Pannier.findAll({ where: { idUser: idUser } })
      .then(data => {
        data = data.map(elt => elt.dataValues).map(elt => {
          const visuel = fs.readFileSync(__dirname + '/../ressources/Visual/' + elt.visuelCommande + '.json').toString('utf8')
          elt.visuel = JSON.parse(visuel).visuelCommande
          return elt
        })


        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving commandes."
        });
      });
  };

// Find a single commande with an id
exports.findOne = (req, res) => {
    const idPannier = req.params.idPannier;
  
    Pannier.findByPk(idPannier)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + idPannier
        });
      });
  };

// Update a commande by the id in the request
exports.update = (req, res) => {
    const idPannier = req.params.idPannier;
  
    Pannier.update(req.body, {
      where: { idPannier: idPannier }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "cart was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update commande with id=${idPannier}. Maybe commande was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating commande with id=" + idPannier
        });
      });
  };

// Delete a Faq with the specified id in the request
exports.delete = (req, res) => {
    const idPannier = req.params.idPannier;
  
    Commande.destroy({
      where: { idPannier: idPannier }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Faq was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Faq with id=${idPannier}. Maybe Faq was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Faq with id=" + idPannier
        });
      });
  };

// Delete all Faqs from the database.
exports.deleteAll = (req, res) => {
    Commande.destroy({
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

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
