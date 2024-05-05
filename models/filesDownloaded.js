const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const { urlencoded } = require('body-parser');

const Expenses=sequelize.define('filesDownloaded',{
  id:{
    type:Sequelize.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
  },
  url:{
    type:Sequelize.STRING(255),
    allowNull:false,
    },
 
});
module.exports=Expenses;