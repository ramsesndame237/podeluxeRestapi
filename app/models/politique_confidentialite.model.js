module.exports = (sequelize, Sequelize) => {
    const PolitiqueConfig = sequelize.define("politiques_config", {
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
  
    return PolitiqueConfig;
  };
  