export default (sequelize, DataTypes) => {
    const Channel = sequelize.define('channel', {
      name: DataTypes.STRING,
      public: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    });
  
  
    return Channel;
  };