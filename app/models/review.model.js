
module.exports = (sequelize, Sequelize,DataTypes) => {
    const Review = sequelize.define("reviews", {
      idReview: {
        type: Sequelize.INTEGER,
        primaryKey: true, allowNull: false, autoIncrement: true
      },
      imageUrlBefore: {
        type: DataTypes.TEXT, allowNull: true,
      },
      imageUrlAfter: {
        type: DataTypes.TEXT, allowNull: true,
      },
      review_description: {
        type: Sequelize.STRING, allowNull: false
      },
      client_email: {
        type: Sequelize.STRING, allowNull: false
      },
      client_name: {
        type: Sequelize.STRING, allowNull: false
      }
    });
  
    return Review;
  };
  