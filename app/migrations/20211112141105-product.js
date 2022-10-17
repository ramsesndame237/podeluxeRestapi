'use strict';
const db = require('../models')
const product=require("../data/product.json")
var Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const promises = []

    for (let i = 0; i < product.length; i++) {
      const tl = product[i]

      if (!await db.product.count({ where: { idProduct: tl.idProduct } })) {
        promises.push(db.product.create({
          idProduct: tl.idProduct,
          nameProduct: tl.nameProduct,
          descriptionProduct:tl.descriptionProduct,
          prixProduct: tl.prixProduct,
          tagPrdouct:tl.tagPrdouct,
          photosProduit:tl.photosProduit,
          review:tl.review,
          // designs:tl.designs,
          // cuts:tl.cuts,
          // extras:tl.extras
       }))
      }
    }
    return Promise.all(promises)
  },

  // down: async (queryInterface, Sequelize) => {
  //   const promises = []

  //   for (let i = 0, size = product.length; i < size; i++) {
  //       promises.push(db.size.delete({ where: { idSize: product[i].idSize } }))
  //   }

  //   return Promise.all(promises)
  // }
  down: function(queryInterface) {
    return Promise.resolve()
  }
};
