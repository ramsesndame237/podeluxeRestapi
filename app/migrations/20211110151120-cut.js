'use strict';
const db = require('../models')
const cutType=require("../data/cut.json")


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const promises = []

    for (let i = 0; i < cutType.length; i++) {
      const tl = cutType[i]

      if (!await db.cut.count({ where: { nameCut: tl.nameCut } })) {
        promises.push(db.cut.create({
          idCut:tl.idCut,
          nameCut: tl.nameCut,
          image: tl.image,
          illustration:tl.illustration
       }))
      }
    }
    return Promise.all(promises)
  },

  // down: async (queryInterface, Sequelize) => {
  //   const promises = []

  //   for (let i = 0, size = cutType.length; i < size; i++) {
  //       promises.push(db.extra.delete({ where: { nameCut: cutType[i].nameCut } }))
  //   }

  //   return Promise.all(promises)
  // }
  down: function(queryInterface) {
    return Promise.resolve()
  }
};
