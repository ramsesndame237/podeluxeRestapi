module.exports = (sequelize, Sequelize) => {
    const ReponseFaq = sequelize.define("reponseFaqs", {
    idReponseFaq: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      reponseFaq: {
        type: Sequelize.STRING
      },
      image:{
          type:Sequelize.STRING
      }
    });
  
    return ReponseFaq;
  };
  