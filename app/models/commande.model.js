module.exports = (sequelize, Sequelize) => {
    const Commande = sequelize.define("commandes", {
        idCommande: {
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
      amountProduct: {
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
        type:Sequelize.TEXT
      },
      OrderNumber: {
        type:Sequelize.STRING
      },
      DateOrdered: {
        type:Sequelize.STRING
      },
      paymentMode:{
        type:Sequelize.STRING
      },
      OrderStatus:{
        type:Sequelize.STRING
      },
      shippingCommande:{
        type:Sequelize.STRING
      },
       shippingUserAdress:{
        type:Sequelize.STRING
      },
      shippingUserCountry:{
        type:Sequelize.STRING
      },
      shippingUserState:{
        type:Sequelize.STRING
      },
     shippingUserPostCode:{
        type:Sequelize.STRING
      },
      shippingUserEmail:{
        type:Sequelize.STRING
      },
      shippingUserMobile:{
        type:Sequelize.STRING
      },
      VisuelModify: {
        type:Sequelize.TEXT
      }
    });
  
    return Commande;
  };
  