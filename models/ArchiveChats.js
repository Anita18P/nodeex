const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const ArchivedChats=sequelize.define('ArchivedChats',{
    Messages: Sequelize.STRING,
    fileUrl: Sequelize.STRING,
    chatUserId: Sequelize.INTEGER,
    GroupId: Sequelize.INTEGER,
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
});
module.exports=ArchivedChats;