const { Sequelize } = require("sequelize");

const sequelize=require("../util/database");

const Member=sequelize.define("Member",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      memberName:{
        type:Sequelize.STRING,
        allowNull:false 
      }
})
module.exports=Member;