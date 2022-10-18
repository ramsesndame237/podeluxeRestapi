module.exports = (sequelize, Sequelize) => {
  const Photo = sequelize.define("photos", {
    idPhoto: {
      type: Sequelize.INTEGER,
      primaryKey: true, allowNull: false, autoIncrement: true
    },
    imageUrl: {
      type: Sequelize.STRING, allowNull: false,
    },
    imageName: {
      type: Sequelize.STRING, allowNull: false
    }
  });

  return Photo;
};
