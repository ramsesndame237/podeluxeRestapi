module.exports = (sequelize, Sequelize) => {
    const PolitiqueLivraison = sequelize.define("politiques_livraison", {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4()
      },
      blocks: {
        type: Sequelize.TEXT, 
      },
      type_justicy:{
        type:Sequelize.STRING
      }
     
    });
  
    return PolitiqueLivraison; 
  };
  