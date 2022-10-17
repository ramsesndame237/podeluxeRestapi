module.exports = (sequelize, Sequelize) => {
    const RearSize = sequelize.define("rearSize", {
      idRearSize: {
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
  
    return RearSize;
  };
  


  