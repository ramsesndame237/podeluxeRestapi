'use strict';
const db = require('../models')
const categoryType=require("../data/category.json")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const promises = []

    for (let i = 0; i < categoryType.length; i++) {
      const tl = categoryType[i]

      if (!await db.category.count({ where: { name: tl.name} })) {
        promises.push(db.category.create({
          idCategory:tl.idCategory,
          name: tl.name,
          code:tl.code,
       }))
      }
    }
    return Promise.all(promises)
  },

  down: function(queryInterface) {
    return Promise.resolve()
  }
};
