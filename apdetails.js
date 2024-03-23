const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const bookApps=sequelize.define('appointment',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true,
  },
  name:Sequelize.STRING,
  phone:{
    type:Sequelize.DOUBLE,
    allowNull:false,
    unique:true
  },
  email:{
    type:Sequelize.STRING,
    allowNull:false,
    unique:true
  }
  
});
module.exports=bookApps;