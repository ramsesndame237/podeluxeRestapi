module.exports = (sequelize, Sequelize,DataTypes) => {
    const BannerPub = sequelize.define("banner_pub", {
      idBannerPub: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4()
    },
      title: {
        type: Sequelize.STRING
      },
      description:{
        type:Sequelize.TEXT
      },
      imageUrl:{
        type:DataTypes.TEXT
      },
    });
  
    return BannerPub;
  };
  