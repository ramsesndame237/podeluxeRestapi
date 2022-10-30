module.exports = (sequelize, Sequelize) => {
    const Politique = sequelize.define("politiques", {
      idPolitique: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4()
      },
      blocks: {
        type: Sequelize.TEXT, 
        get: function() {
            return JSON.parse(this.getDataValue('myArrayField'));
        }, 
        set: function(val) {
            return this.setDataValue('myArrayField', JSON.stringify(val));
        }
      },
      version: {
        type: Sequelize.STRING, allowNull: true
      },
      time: {
        type: Sequelize.STRING, allowNull: true
      }
    });
  
    return Politique;
  };
  