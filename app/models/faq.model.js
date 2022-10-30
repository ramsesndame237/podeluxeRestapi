module.exports = (sequelize, Sequelize) => {
    const Faq = sequelize.define("faqs", {
      idFaq: {
        type: Sequelize.INTEGER,
        primaryKey: true, allowNull: false, autoIncrement: true
      },
      question: {
        type: Sequelize.TEXT, allowNull: false,
      },
      reponse: {
        type: Sequelize.TEXT, allowNull: false
      }
    });
  
    return Faq;
  };
  