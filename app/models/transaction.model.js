
module.exports = (sequelize, Sequelize,DataTypes) => {
    const Transaction = sequelize.define("transaction", {
      idTransaction: {
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
      priceCommande:{
        type:DataTypes.INTEGER
      }, 
      transation_status:{
        type:Sequelize.STRING
      },
      command_status:{
        type:Sequelize.STRING
      }
    });
  
    return Transaction;
  };
  