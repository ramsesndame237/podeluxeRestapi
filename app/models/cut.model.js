module.exports = (sequelize, Sequelize) => {
    const Cut = sequelize.define("cuts", {
      idCut: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nameCut: {
        type: Sequelize.STRING
      },
      image:{
          type:Sequelize.TEXT
      },
    });
  
    return Cut;
  };
  


  