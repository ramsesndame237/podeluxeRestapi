module.exports = (sequelize, Sequelize) => {
    const Design = sequelize.define("designs", {
    idDesign: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      nameDesign: {
        type: Sequelize.STRING
      },
      image:{
          type:Sequelize.STRING
      }
    });
  
    return Design;
  };
  