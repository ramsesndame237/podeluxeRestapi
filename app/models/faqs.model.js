module.exports = (sequelize, Sequelize) => {
    const Faq = sequelize.define("faqs", {
    idFaq: {
        type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false, autoIncrement: true
        
      },
      questionFaq: {
        type: Sequelize.TEXT
      },
      image:{
          type:Sequelize.TEXT
      }
    });
  
    return Faq;
  };
  