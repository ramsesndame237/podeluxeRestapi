'use strict';
const db = require('../models')
const subcategoryType=require("../data/subcategory.json");
const { generateUUID } = require('../utils/utils');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const promises = []

    for (let i = 0; i < subcategoryType.length; i++) {
      const tl = subcategoryType[i]

      if (!await db.subcategory.count({ where: { name: tl.name} })) {
        promises.push(db.subcategory.create({
          idSubCategory:generateUUID(),
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
