const Sequelize=require('sequelize');
const sequelize=new Sequelize('mysqllearn','root','Anita@18041994',{ 
    dialect:'mysql',
    host:'localhost',
});

module.exports=sequelize;