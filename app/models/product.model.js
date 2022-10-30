module.exports = (sequelize, Sequelize,DataTypes) => {
    const Product = sequelize.define("product", {
      idProduct: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4()
    },
      name: {
        type: Sequelize.STRING
      },
      description:{
        type:Sequelize.TEXT
      },
      dimension:{
        allowNull:true,
        type:Sequelize.STRING,
      },
      composition:{
        allowNull:true,
        type:Sequelize.STRING 
      },
      imageUrl:{
        type:DataTypes.TEXT
      },
      review:{
        allowNull:true,
        type:DataTypes.INTEGER,
        defaultValue:2
      },
      price:{
        type:DataTypes.DECIMAL
      },
      stockQuantity:{
        type:DataTypes.INTEGER
      },
      saleQuantity:{
        type:DataTypes.INTEGER
      },
      inStockQuantity:{
        type:DataTypes.INTEGER
      },
      promotionPrice:{
        allowNull:true,
        type:DataTypes.DECIMAL
      },
      rating:{
        type:DataTypes.INTEGER
      }
    });
  
    return Product;
  };
  