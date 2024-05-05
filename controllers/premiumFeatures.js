const expenseApp=require('../models/expense');
const User=require('../models/User');
const sequelize = require('../util/database');


exports.getUserLeaderBoard= async(req,res,next)=>{
 try{
  
    console.log("I am in getUserLeaderBoard");
    const leaderboardofuser= await User.findAll({
        attributes:['id','Name','total_Expenses'],
        order:[['total_Expenses','DESC']],
        });
      res.status(200).json(leaderboardofuser);
    
}catch(error){
    console.log(error);
    res.status(500).json(error);
}
};
  

