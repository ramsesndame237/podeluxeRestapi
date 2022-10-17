module.exports = (sequelize, Sequelize) => {
    const Background = sequelize.define("backgrounds", {
        idBackground: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4()
        },
      nameBackground: {
        type: Sequelize.STRING
      },
      descriptionBackground:{
          type:Sequelize.STRING
      },
      imageSrcBackground: {
        type:Sequelize.TEXT
      }
    });
  
    return Background;
  };
  