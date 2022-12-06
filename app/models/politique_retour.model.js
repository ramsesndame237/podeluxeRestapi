module.exports = (sequelize, Sequelize) => {
    const PolitiqueRetour = sequelize.define("politiques_retour", {
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
  
    return PolitiqueRetour;
  };
  