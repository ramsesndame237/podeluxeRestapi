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
db.product=require("../models/product.model.js")(sequelize,Sequelize);
db.extra=require("../models/extra.model.js")(sequelize,Sequelize);
db.cut=require("../models/cut.model.js")(sequelize,Sequelize);
db.design=require("../models/design.model.js")(sequelize,Sequelize);
db.size=require("../models/size.model.js")(sequelize,Sequelize);
db.photo=require("../models/photos.model.js")(sequelize,Sequelize);
db.job=require("../models/job.model.js")(sequelize,Sequelize);
db.background=require("../models/background.model.js")(sequelize,Sequelize)
db.icone = require("../models/icones.model.js")(sequelize, Sequelize)
db.faq = require("../models/faqs.model.js")(sequelize, Sequelize)
db.reponseFaq = require("../models/reponseFaq.model.js")(sequelize, Sequelize)
db.visuel = require("../models/visuel.model.js")(sequelize, Sequelize)
db.commande = require("../models/commande.model.js")(sequelize, Sequelize)
db.pannier = require("../models/pannier.model.js")(sequelize, Sequelize)
db.client = require("../models/client.model.js")(sequelize,Sequelize)
db.chat  = require("../models/chat.model.js")(sequelize,Sequelize)


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

db.chat.belongsTo(db.user,{
  foreignKey:{
    name:'fromUserId',
    allowNull:true
  }
}),
// db.chat.belongsTo(db.user,{
//   foreignKey:'toUserId'
// })

/**
 * this is the relation between product and others description product 
 */

/**
 * relation between product and size , -> a product can have mutiple size and a size can by attribut to many product so we are in many to many relationship 
 */
db.product.belongsToMany(db.size, {
  through: "product_sizes",
  foreignKey: 'idProduct',
  otherKey:'idSize'
})
db.size.belongsToMany(db.product, {
  through: 'product_sizes',
  foreignKey: 'idProduct',
  otherKey:'idSize'
})

/**
 * relation between product and cut , -> a product can have mutiple cut and a cut can by attribut to many product so we are in many to many relationship 
 * 
 */
db.product.belongsToMany(db.cut, {
  through: "product_cuts",
  foreignKey: 'idProduct',
  otherKey:'idCut'
})
db.cut.belongsToMany(db.product, {
  through: 'product_cuts',
  foreignKey: 'idCut',
  otherKey:'idProduct'
})

/**
 * relation between product and extra , -> a product can have mutiple extra and a extra can by attribut to many product so we are in many to many relationship 
 * 
 */
db.product.belongsToMany(db.extra, {
  through: "product_extras",
  foreignKey: 'idProduct',
  otherKey:'idExtra'
})
db.extra.belongsToMany(db.product, {
  through: 'product_extras',
  foreignKey: 'idExtra',
  otherKey:'idProduct'
})
/**
 * relation between product and design , -> a product can have mutiple design and a design can by attribut to many product so we are in many to many relationship 
 * 
 */
db.product.belongsToMany(db.design, {
  through: "product_designs",
  foreignKey: 'idProduct',
  otherKey:'idDesign'
})
db.design.belongsToMany(db.product, {
  through: 'product_designs',
  foreignKey: 'idDesign',
  otherKey:'idProduct'
})
//   db.job.hasMany(db.photo, {
//     foreignKey: {
//       allowNull: true,
//       name: 'idJob'
//     }
// })
//   db.photo.belongsTo(db.job, {
//     foreignKey: {
//       allowNull: true,
//       name: 'idJob'
//     }
//   })
  /**
   * 
   */
db.user.hasMany(db.commande, {
     foreignKey: {
      allowNull: true,
      name: 'idUser'
    }
})
db.commande.belongsTo(db.user, {
    foreignKey: {
      allowNull: true,
      name: 'idUser'
    }
})
db.client.hasMany(db.commande, {
     foreignKey: {
      allowNull: true,
      name: 'idClient'
    }
})
db.commande.belongsTo(db.client, {
    foreignKey: {
      allowNull: true,
      name: 'idClient'
    }
})
db.client.hasMany(db.commande, {
     foreignKey: {
      allowNull: true,
      name: 'idClient'
    }
})
db.commande.belongsTo(db.client, {
    foreignKey: {
      allowNull: true,
      name: 'idClient'
    }
})
 /**
   * 
   */
db.user.hasMany(db.pannier, {
  onDelete: 'CASCADE',
     onUpdate: 'RESTRICT',
     foreignKey: {
      allowNull: false,
      name: 'idUser'
    }
})
db.pannier.belongsTo(db.user, {
     onDelete: 'CASCADE',
     onUpdate: 'RESTRICT',
    foreignKey: {
      allowNull: false,
      name: 'idUser'
    }
})
db.ROLES = ["client", "admin", "moderator"];

module.exports = db;
