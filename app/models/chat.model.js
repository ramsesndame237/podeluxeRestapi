'use strict';
module.exports = (sequelize, Sequelize,DataTypes) => {
    const Chat = sequelize.define('Chat', {
        fromUserId: Sequelize.INTEGER,
        toUserId: Sequelize.INTEGER,
        chat: Sequelize.TEXT
      })
  
    return Chat
};
  