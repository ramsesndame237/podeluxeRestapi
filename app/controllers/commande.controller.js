

const db = require("../models");
const Transaction = db.transaction;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.priceCommande) {
      res.status(400).send({
        message: "Les données fournis sont incomplet!"
      });
      return;
    }
  
    // Create a Product
    const transaction = {
          name: req.body.name,
          lastName: req.body.lastName,
          companyName: req.body.companyName,
          tel1: req.body.tel1,
          country: req.body.country,
          city: req.body.city,
          state: req.body.state,
          postcode: req.body.postcode,
          email: req.body.email,
          priceCommande:req.body.priceCommande,
          transation_status:req.body.transation_status,
          command_status:'A Livrer'
    };
  
    // Save product in the database
    Transaction.create(transaction)
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

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
  Transaction.findAll({ where: condition })
      .then( async  (data) => {

        // const review = await db.review.count({col:"idProduct",where:{idProduct :data.idProduct}})

        // data.forEach(element => {

        //   element.review = review
          
        // });
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
      });
  };

// Find a single product with an id
exports.findOne = (req, res) => {
    const idTransaction = req.params.idTransaction;
  
    Transaction.findByPk(idTransaction)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving product with id=" + idTransaction
        });
      });
  };

// Update a product by the id in the request
exports.update = (req, res) => {
    const idTransaction = req.params.idTransaction;

    console.log(idTransaction)
  
    Transaction.update(req.body, {
      where: { idTransaction: idTransaction }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            message: `Le produit ${req.body.name} à été mis à jour avec succès`
          });
        } else {
          res.send({
            message: `Cannot update Product with id=${idProduct}. Maybe Product was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Product with id=" + idProduct
        });
      });
  };

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
    const idTransaction = req.params.idTransaction;
  
    Transaction.destroy({
      where: { idTransaction: idTransaction }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Product was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Product with id=${idTransaction}. Maybe Product was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Product with id=" + idTransaction
        });
      });
  };

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
    Transaction.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Products were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Products."
        });
      });
  };

