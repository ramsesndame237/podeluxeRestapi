module.exports = (sequelize, Sequelize) => {
    const Avis = sequelize.define("avis", {
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
  
    return Avis;
  };
  