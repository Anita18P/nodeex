const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const attendance=sequelize.define('Attendance',{
  id:{
    type:Sequelize.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
  },
  aDate:{
    type:Sequelize.DATEONLY,
    allowNull:false,
    },
  name:{
    type:Sequelize.STRING,
  },
  attendance:{
    type:Sequelize.STRING,
  }
});
module.exports=attendance;