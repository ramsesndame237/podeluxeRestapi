module.exports = (sequelize, Sequelize) => {
    const Pannier = sequelize.define("panniers", {
        idPannier: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4()
        },
      ProduitCommande: {
        type: Sequelize.STRING
      },
      amountCommande:{
          type:Sequelize.STRING
      },
      statutCommande: {
        type:Sequelize.STRING
      },
      sizeCommande: {
        type:Sequelize.STRING
      },
      cutCommande: {
        type:Sequelize.STRING
      },
      ExtraCommande: {
        type:Sequelize.STRING
      },
      designCommande: {
        type:Sequelize.STRING
      },
      quantityCommande: {
        type:Sequelize.STRING
      },
      visuelCommande: {
        type:Sequelize.STRING
      },
    });
  
    return Pannier;
  };
  