module.exports = (sequelize, Sequelize) => {
    const About = sequelize.define("abouts", {
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
  
    return About;
  };
  