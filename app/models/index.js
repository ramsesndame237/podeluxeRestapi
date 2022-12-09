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
db.photo = require("../models/photos.model.js")(sequelize, Sequelize);
db.client = require("../models/client.model.js")(sequelize, Sequelize)
db.product = require("../models/product.model.js")(sequelize, Sequelize, Sequelize.DataTypes)
db.review = require("../models/review.model.js")(sequelize, Sequelize, Sequelize.DataTypes)
db.transaction = require("../models/transaction.model.js")(sequelize, Sequelize, Sequelize.DataTypes)
db.faq = require("../models/faq.model.js")(sequelize, Sequelize)
db.politique = require("../models/politique_retour.model.js")(sequelize, Sequelize)
db.politiqueConfig = require("../models/politique_confidentialite.model.js")(sequelize, Sequelize)
db.politiqueLivraison = require("../models/politique_livraison.model.js")(sequelize, Sequelize)
db.confidentialite = require("../models/confidentialite.model.js")(sequelize,Sequelize)
db.category = require("../models/category.model.js")(sequelize, Sequelize)
db.subcategory = require("../models/sub_category.model.js")(sequelize, Sequelize)
db.bannerPub = require("../models/banner_pub.model.js")(sequelize, Sequelize, Sequelize.DataTypes)
db.about = require("../models/about.model.js")(sequelize,Sequelize)
db.avis = require("../models/avis.model.js")(sequelize,Sequelize)



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

db.category.hasMany(db.subcategory, {
  foreignKey: {
    allowNull: true,
    name: 'idCategory'
  }
})
db.subcategory.belongsTo(db.category,{
  foreignKey:{
    allowNull:true,
    name:'idCategory'
  }
})

db.subcategory.hasMany(db.product, {
  foreignKey: {
    allowNull: true,
    name: 'idSubCategory'
  }
})
db.product.belongsTo(db.subcategory, {
  foreignKey: {
    allowNull: true,
    name: 'idSubCategory'
  }
})

db.transaction.belongsToMany(db.product, {
  through: "product_commandes",
  foreignKey: 'idTransaction',
  otherKey: 'idProduct'
})
db.product.belongsToMany(db.transaction, {
  through: "product_commandes",
  foreignKey: 'idProduct',
  otherKey: 'idTransaction'
})

db.ROLES = ["client", "admin", "moderator"];

module.exports = db;
