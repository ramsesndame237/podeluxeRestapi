

const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.price) {
      res.status(400).send({
        message: "Les données fournis sont incomplet!"
      });
      return;
    }
  
    // Create a Product
    const product = {
        name:req.body.name,
        description:req.body.description,
        dimension:req.body.dimension,
        composition:req.body.composition,
        review:req.body.review,
        imageUrl:req.body.imageUrl,
        price:req.body.price,
        stockQuantity:req.body.stockQuantity,
        inStockQuantity:req.body.inStockQuantity,
        promotionPrice:req.body.promotionPrice,
        idSubCategory:req.body.idSubCategory,
        rating:req.body.rating || 2
    };
  
    // Save product in the database
    Product.create(product)
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
  
    Product.findAll({ where: condition })
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
    const idProduct = req.params.idProduct;
  
    Product.findByPk(idProduct)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving product with id=" + idProduct
        });
      });
  };

// Update a product by the id in the request
exports.update = (req, res) => {
    const idProduct = req.params.idProduct;

    console.log(idProduct)
  
    Product.update(req.body, {
      where: { idProduct: idProduct }
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
    const idProduct = req.params.idProduct;
  
    Product.destroy({
      where: { idProduct: idProduct }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Product was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Product with id=${idProduct}. Maybe Product was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Product with id=" + idProduct
        });
      });
  };

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
    Product.destroy({
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

// // Find all published Products
// exports.findAllPublished = (req, res) => {
  
// };