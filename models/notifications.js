const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Notifications=sequelize.define('Notification',{
  id:{
    type:Sequelize.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
  },
  link:{
    type:Sequelize.STRING,
    allowNull:false,
    },
  userId:{
    type:Sequelize.INTEGER,
    allowNull:false,
  }
});
module.exports=Notifications;