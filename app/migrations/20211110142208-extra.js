'use strict';
const db = require('../models')
const extraType=require("../data/extra.json")


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const promises = []

    for (let i = 0; i < extraType.length; i++) {
      const tl = extraType[i]

      if (!await db.extra.count({ where: { nameExtra: tl.nameExtra } })) {
        promises.push(db.extra.create({
          id:tl.id,
          nameExtra: tl.nameExtra,
          image: tl.image,
          illustration:tl.illustration
       }))
      }
    }
    return Promise.all(promises)
  },

  // down: async (queryInterface, Sequelize) => {
  //   const promises = []

  //   for (let i = 0, size = extraType.length; i < size; i++) {
  //       promises.push(db.extra.delete({ where: { nameExtra: extraType[i].nameExtra } }))
  //   }

  //   return Promise.all(promises)
  // }
  down: function(queryInterface) {
    return Promise.resolve()
  }
};
