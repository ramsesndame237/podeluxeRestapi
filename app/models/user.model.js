module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    idUser: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4()
  },
    name: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    companyName: {
      type: Sequelize.STRING
    },
    tel1: {
      type: Sequelize.STRING
    },
    tel2: {
      type: Sequelize.STRING
    },
    tel3: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    postcode: {
      type: Sequelize.STRING
    },
    brand: {
      type: Sequelize.STRING
    },
    model: {
      type: Sequelize.STRING
    },
    years: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return User;
};
