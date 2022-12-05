module.exports = (sequelize, Sequelize) => {
    const PolitiqueConfig = sequelize.define("politiques_config", {
      idPolitiqueConfig: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4()
      },
      blocks: {
        type: Sequelize.TEXT, 
      },
     
    });
  
    return PolitiqueConfig;
  };
  