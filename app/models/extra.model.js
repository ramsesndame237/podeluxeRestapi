module.exports = (sequelize, Sequelize) => {
    const Extra = sequelize.define("extra", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      nameExtra: {
        type: Sequelize.STRING
      },
      image:{
          type:Sequelize.STRING
      }
    });
  
    return Extra;
  };
  