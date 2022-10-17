'use strict';
const db = require('../models')
const associationSize=require("../data/association_Size.json")


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const promises = []

    for (let i = 0; i < associationSize.length; i++) {
      const tl = associationSize[i]

      if (!await db.product_size.count({ where: { idSize: tl.idSize } })) {
        promises.push(db.size.create({
        idSize:tl.idSize,
        nameSize:tl.nameSize,
        dimension:tl.dimension,
        nameWithProduct:tl.nameWithProduct,
        image:tl.image
       }))
      }
    }
    return Promise.all(promises)
  },

  // down: async (queryInterface, Sequelize) => {
  //   const promises = []

  //   for (let i = 0, size = associationSize.length; i < size; i++) {
  //       promises.push(db.size.delete({ where: { idSize: associationSize[i].idSize } }))
  //   }

  //   return Promise.all(promises)
  // }
  down: function(queryInterface) {
    return Promise.resolve()
  }
};
