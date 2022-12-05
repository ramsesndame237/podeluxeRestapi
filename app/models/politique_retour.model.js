module.exports = (sequelize, Sequelize) => {
    const Politique = sequelize.define("politiques_retour", {
      idPolitiqueRetour: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4()
      },
      blocks: {
        type: Sequelize.TEXT, 
        // get: function() {
        //     return JSON.parse(this.getDataValue('myArrayField'));
        // }, 
        // set: function(val) {
        //     return this.setDataValue('myArrayField', JSON.stringify(val));
        // }
      },
     
    });
  
    return PolitiqueRetour;
  };
  