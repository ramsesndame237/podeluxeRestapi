module.exports = (sequelize, Sequelize) => {
    const FlexiSize = sequelize.define("flexiSize", {
      idFlexiSize: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nameSize: {
        type: Sequelize.STRING
      },
      dimension:{
        type: Sequelize.STRING
      },
      image:{
          type:Sequelize.TEXT
      },
    });
  
    return FlexiSize;
  };
  


  