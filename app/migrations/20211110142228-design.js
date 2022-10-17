'use strict';
const db = require('../models')
const designType=require("../data/design.json")


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const promises = []

    for (let i = 0; i < designType.length; i++) {
      const tl = designType[i]

      if (!await db.design.count({ where: { nameDesign: tl.nameDesign } })) {
        promises.push(db.design.create({
          idDesign:tl.idDesign,
          nameDesign: tl.nameDesign,
          image: tl.image,
          illustration:tl.illustration
       }))
      }
    }
    return Promise.all(promises)
  },

  // down: async (queryInterface, Sequelize) => {
  //   const promises = []

  //   for (let i = 0, size = designType.length; i < size; i++) {
  //       promises.push(db.design.delete({ where: { nameDesign: designType[i].nameDesign } }))
  //   }

  //   return Promise.all(promises)
  // }
  down: function(queryInterface) {
    return Promise.resolve()
  }
};
