module.exports = (sequelize, Sequelize) => {
    const Job = sequelize.define("jobs", {
        idJob: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4()
        },
      jobname: {
        type: Sequelize.STRING
      },
      descriptionJob:{
          type:Sequelize.STRING
      }
    });
  
    return Job;
  };
  