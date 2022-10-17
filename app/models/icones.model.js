module.exports = (sequelize, Sequelize) => {
    const Icone = sequelize.define("icones", {
        idIcone: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4()
        },
      titleIcone: {
        type: Sequelize.STRING
      },
      descriptionIcone:{
          type:Sequelize.STRING
      }
    });
  
    return Icone;
  };
  