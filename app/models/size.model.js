module.exports = (sequelize, Sequelize) => {
    const Size = sequelize.define("sizes", {
     idSize: {
        type: Sequelize.INTEGER,
        primaryKey: true, allowNull: false, autoIncrement: true

      },
      nameSize: {
        type: Sequelize.STRING
      },
      nameWithProduct: {
          type:Sequelize.STRING
      },
      dimension: {
          type:Sequelize.STRING
      },
      image:{
          type:Sequelize.TEXT
      }
    });
  
    return Size;
  };
  