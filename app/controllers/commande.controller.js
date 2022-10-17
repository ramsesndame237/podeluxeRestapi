const db = require("../models");
const Commande = db.commande
const fs = require('fs')
const Op = db.Sequelize.Op;

// Create and Save a new commande
exports.create = (req, res) => {
    // Validate request
    if (!req.body.ProduitCommande) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
     // Create a commande
    const commande = {
      ProduitCommande: req.body.ProduitCommande,
      amountCommande: req.body.amountCommande,
      amountProduct:req.body.amountProduct,
      statutCommande: req.body.statutCommande,
      sizeCommande: req.body.sizeCommande,
      OrderStatus: req.body.OrderStatus,
      shippingCommande: req.body.shippingCommande,
      shippingUserAdress:req.body.shippingUserAdress,
      shippingUserCountry:req.body.shippingUserCountry,
      shippingUserState:req.body.shippingUserState,
      shippingUserPostCode:req.body.shippingUserPostCode,
      shippingUserEmail:req.body.shippingUserEmail,
      shippingUserMobile:req.body.shippingUserMobile,
      paymentMode:req.body.paymentMode,
      cutCommande: req.body.cutCommande,
      ExtraCommande: req.body.ExtraCommande,
      designCommande: req.body.designCommande,
      quantityCommande: req.body.quantityCommande,
      visuelCommande: req.body.visuelCommande,
      DateOrdered: req.body.DateOrdered,
      OrderNumber: req.body.OrderNumber,
      VisuelModify: req.body.VisuelModify,
      idUser: req.body.idUser || null,
      idClient:req.body.idClient || null
    };
  
    // Save commande in the database
    Commande.create(commande)
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
    const ProduitCommande = req.query.ProduitCommande;
    var condition = ProduitCommande ? { ProduitCommande} : null;
  
    Commande.findAll({ where: condition })
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
    const idcommande = req.params.idcommande;
  
    Commande.findByPk(idcommande)
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
          message: "Error retrieving Tutorial with id=" + idcommande
        });
      });
  };

// Update a commande by the id in the request
exports.update = (req, res) => {
    const idCommande = req.params.idCommande;
  
    Commande.update(req.body, {
      where: { idCommande: idCommande }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "commande was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update commande with id=${idCommande}. Maybe commande was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating commande with id=" + idCommande
        });
      });
  };

// Delete a commande with the specified id in the request
exports.delete = (req, res) => {
    const idCommande = req.params.idCommande;
  
    Commande.destroy({
      where: { idCommande: idCommande }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "commande was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete commande with id=${idCommande}. Maybe commande was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete commande with id=" + idCommande
        });
      });
  };

// Delete all commandes from the database.
exports.deleteAll = (req, res) => {
    Commande.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} commandes were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all commandes."
        });
      });
  };

// // Find all published commandes
// exports.findAllPublished = (req, res) => {
  
// };