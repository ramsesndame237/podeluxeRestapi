const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, Sequelize);
db.photo=require("../models/photos.model.js")(sequelize,Sequelize);
db.client = require("../models/client.model.js")(sequelize,Sequelize)
db.product = require("../models/product.model.js")(sequelize,Sequelize,Sequelize.DataTypes)
db.review = require("../models/review.model.js")(sequelize,Sequelize,Sequelize.DataTypes)



db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId", 
  otherKey: "roleId"
});

db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId', targetKey: 'idUser'
});
db.user.hasOne(db.refreshToken, { 
  foreignKey: 'userId', targetKey: 'idUser'
});

db.product.hasMany(db.review, {
  foreignKey: {
   allowNull: true,
   name: 'idProduct' 
 }
})
db.review.belongsTo(db.product, {
 foreignKey: {
   allowNull: true,
   name: 'idProduct'
 }
})

db.ROLES = ["client", "admin", "moderator"];

module.exports = db;
