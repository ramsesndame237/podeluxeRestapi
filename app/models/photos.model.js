module.exports = (sequelize, Sequelize) => {
    const Photo = sequelize.define("photos", {
      idPhoto: {
        type: Sequelize.INTEGER,
        primaryKey: true, allowNull: false, autoIncrement: true
      },
      imageSrc: {
        type: Sequelize.TEXT, allowNull: false ,
      }
    });
  
    return Photo;
  };
  