module.exports = (sequelize, Sequelize) => {
    const Visuel = sequelize.define("visuels", {
        idVisuel: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4()
        },
      visuel: {
        type: Sequelize.STRING
      },
    });
  
    return Visuel;
  };
  