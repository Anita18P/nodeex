const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Message=sequelize.define('Message',{
  id:{
    type:Sequelize.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
  },
  Messages:{
    type:Sequelize.STRING,
    allowNull:false,
    }
});
module.exports=Message;