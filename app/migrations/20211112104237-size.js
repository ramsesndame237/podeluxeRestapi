'use strict';
const db = require('../models')
const sizeType=require("../data/size.json")


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const promises = []

    for (let i = 0; i < sizeType.length; i++) {
      const tl = sizeType[i]

      if (!await db.size.count({ where: { idSize: tl.idSize } })) {
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

  //   for (let i = 0, size = sizeType.length; i < size; i++) {
  //       promises.push(db.size.delete({ where: { idSize: sizeType[i].idSize } }))
  //   }

  //   return Promise.all(promises)
  // }
  down: function(queryInterface) {
    return Promise.resolve()
  }
};
