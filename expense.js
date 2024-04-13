const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Expenses=sequelize.define('ExpenseDetails',{
  id:{
    type:Sequelize.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
  },
  Amount:{
    type:Sequelize.INTEGER,
    allowNull:false,
    },
  Description:{
    type:Sequelize.STRING,
    allowNull:false,
   
  },
 Category:{
    type:Sequelize.STRING,
    allowNull:false,

  }
});
module.exports=Expenses;