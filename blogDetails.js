const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const blogContent=sequelize.define('Blogs',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true,
  },
  Title:Sequelize.STRING,
  Author:{
    type:Sequelize.STRING,
    allowNull:false,
    
  },
   Content:{
    type:Sequelize.STRING,
    allowNull:false,
    
  }
  
});
module.exports=blogContent;