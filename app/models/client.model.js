module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
    idClient: {
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
      country: {
      type: Sequelize.STRING,allowNull:true
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
    email: {
      type: Sequelize.STRING
    },
  });

  return Client;
};
