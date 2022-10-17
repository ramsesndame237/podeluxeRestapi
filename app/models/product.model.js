module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        idProduct: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4()
        },
      nameProduct: {
        type: Sequelize.STRING
      },
      descriptionProduct: {
        type: Sequelize.STRING
      },
      prixProduct: {
        type: Sequelize.STRING
      },
      tagPrdouct:{
          type:Sequelize.STRING
      },
      photosProduit: {
         type: Sequelize.TEXT ,
      },
      review: {
        type:Sequelize.INTEGER
      }
    });
  
    return Product;
  };
  