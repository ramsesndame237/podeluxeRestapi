// const db = require("../models");
// const { product: Product, cut: Cut, size: Size,extra:Extra,design:Design} = db;

// const Op = db.Sequelize.Op;

// // Create and Save a new Product
// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body.nameProduct) {
//       res.status(400).send({
//         message: "Content can not be empty!"
//       });
//       return;
//     }
  
//     // Create a product
//     const product = {
//         nameProduct: req.body.nameProduct,
//         descriptionProduct: req.body.descriptionProduct,
//         prixProduct: req.body.prixProduct,
//         tagPrdouct: req.body.tagPrdouct,
//         photosProduit: req.body.photosProduit,
//         review:req.body.review,
//     };
  
//     // Save product in the database
//     Product.create(product)
//         .then(produit => {
//             if (req.body.sizes) {
//                 Size.findAll({
//                     where: {
//                         idSize: {
//                           [Op.or]:req.body.sizes
//                       }
//                   }
//                 }).then(sizes => {
//                     produit.setSizes(sizes).then(() => {
//                         res.send({message:"product create successfully ! "})
//                     })
//                 })
//             } else if (req.body.cuts) {
//                 Cut.findAll({
//                     where: {
//                         nameCut: {
//                             [Op.or]:req.body.cuts
//                         }
//                     }
//                 }).then((cuts) => {
//                     produit.setCuts(cuts).then(() => {
//                         res.send({message:"product create successfully"})
//                     })
//                 })
//             } else if (req.body.extras) {
//                 Extra.findAll({
//                     where: {
//                         nameExtra: {
//                             [Op.or]:req.body.extras
//                         }
//                     }
//                 }).then((extras) => {
//                     produit.setExtras(extras).then(() => {
//                         res.send({ message: "product create successfully !" })
//                     })
//                 })
//             } else if (req.body.designs) {
//                 Design.findAll({
//                     where: {
//                         nameProduct: {
//                             [Op.or]:req.body.designs
//                         }
//                     }
//                 }).then((designs) => {
//                     produit.setDesign(designs).then(() => {
//                         res.send({ message: "product create successfully !" })
//                     })
//                 })
//             } else {
//                     res.send(produit);
//             }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the design."
//         });
//       });
//   };

// // Retrieve all product from the database.
// exports.findAll = (req, res) => {
//     const nameProduct = req.query.nameProduct;
//     var condition = nameProduct ? { nameProduct} : null;
//     let Tailles = []
//     let Coupes = []
//     let designer = []
//     let decors = []
//     let dataToSend = []
    
//     Product.findAll({ where: condition })
//         .then(product => {
//             for (let i = 0; i < product.length; i++) {
                
//                 product[i].getSizes().then(sizes => {
//                     for (let i = 0; i < sizes.length; i++) {
//                         // Tailles.push(sizes)
//                         console.log(Tailles)
//                     }
//                 })
//                 product[i].getCuts().then(cuts => {
//                     for (let i = 0; i < cuts.length; i++) {
//                         Coupes.push(cuts)
//                     }
//                 })
//                 product[i].getDesigns().then(designs => {
//                     for (let i = 0; i < designs.length; i++) {
//                         designer.push(designs)
//                     }
//                 })
//                 product[i].getExtras().then(extras => {
//                     for (let i = 0; i < extras.length; i++) {
//                         decors.push(extras)
//                     }
//                 })
//                 dataToSend.push({
//                      idProduct: product[i].idProduct,
//                     nameProduct: product[i].nameProduct,
//                     descriptionProduct: product[i].descriptionProduct,
//                     tagPrdouct: product[i].tagPrdouct,
//                     photosProduit: product[i].photosProduit,
//                     review: product[i].review,
//                     extra: decors,
//                     size: Tailles,
//                     design: designer,
//                     cut:Coupes
//                 })
//             }
//             res.status(200).send({dataToSend})

//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving products."
//         });
//       });
//   };

// // Find a single Design with an id
// exports.findOne = (req, res) => {
//     const idDesign = req.params.idDesign;
  
//     Design.findByPk(idDesign)
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving Tutorial with id=" + idDesign
//         });
//       });
//   };

// // Update a Design by the id in the request
// exports.update = (req, res) => {
//     const idDesign = req.params.idDesign;
  
//     Design.update(req.body, {
//       where: { id: idDesign }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Design was updated successfully."
//           });
//         } else {
//           res.send({
//             message: `Cannot update Design with id=${idDesign}. Maybe Tutorial was not found or req.body is empty!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating Design with id=" + idDesign
//         });
//       });
//   };

// // Delete a Design with the specified id in the request
// exports.delete = (req, res) => {
//     const idDesign = req.params.idDesign;
  
//     Design.destroy({
//       where: { idDesign: idDesign }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Design was deleted successfully!"
//           });
//         } else {
//           res.send({
//             message: `Cannot delete Design with id=${idDesign}. Maybe Tutorial was not found!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Could not delete Design with id=" + idDesign
//         });
//       });
//   };

// // Delete all Designs from the database.
// exports.deleteAll = (req, res) => {
//     Design.destroy({
//       where: {},
//       truncate: false
//     })
//       .then(nums => {
//         res.send({ message: `${nums} Designs were deleted successfully!` });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all Designs."
//         });
//       });
//   };

// // // Find all published Designs
// // exports.findAllPublished = (req, res) => {
  
// // };

const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
    if (!req.body.email) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Product
    const product = {
      nameProduct: req.body.nameProduct,
        descriptionProduct: req.body.descriptionProduct,
        prixProduct: req.body.prixProduct,
        tagPrdouct: req.body.tagPrdouct,
        photosProduit: req.body.photosProduit,
        review:req.body.review,
    };
  
    // Save product in the database
    Product.create(product)
        .then(data =>  {
           res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the product."
        });
      });
  };

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
    const idProduct = req.query.idProduct;
    var condition = idProduct ? { idProduct} : null;
  
    Product.findAll({ where: condition })
      .then(data => {
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
  
    Product.update(req.body, {
      where: { id: idProduct }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Product was updated successfully."
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