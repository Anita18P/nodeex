const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const expenseApp=sequelize.define('Expenses',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true,
  },
  Amount:Sequelize.INTEGER,
  Description:{
    type:Sequelize.STRING,
    allowNull:false,
    
  },
  ExpenseCategory:{
    type:Sequelize.STRING,
    allowNull:false,
   
  }
  
});
module.exports=expenseApp;