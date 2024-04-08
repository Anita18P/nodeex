      const fs=require('fs/promises');
      const path=require('path');
      const Sequelize=require('sequelize');
      const {op}=require('sequelize');
      const moment=require('moment');
      const attendance=require('../models/calender');
      const allData=[];
      //-----------------
exports.getAttendancePage= async(req,res,next)=>{
      console.log("--------------");
      console.log('in get attendance page');
try{
      console.log("dirctly from params")
      console.log(`${req.params.date}`);
      console.log("after date constuctor");
      let date1=new Date(req.params.date);
      console.log(date1);
      console.log(typeof(date1));
      const data=await fs.readFile('students.txt',{ encoding: 'utf8' } ,()=>{
            console.log("reading completed");
            });
            const lines =data.split('\r\n');; // Initialize an empty array to store the lines
            console.log(lines);
      const count=await attendance.findAndCountAll({
      where:{
            aDate:date1
      }
      })
      console.log("following is count");
      console.log(count);
  if(count.count!==lines.length){
       for(let i=0;i<lines.length;i++){
            allData[i]=await attendance.create(
                {
                 aDate:date1,
                 name:lines[i]
                })
            }
      console.log('after updating the table');
      console.log(typeof(allData));
      console.log(allData);
      res.status(200).json({data:allData,marked:"unmarked"});
}
     else{
        const count= await attendance.count({
            where:{
                  aDate:date1,
                  attendance:{
                 [Sequelize.Op.not]: null,
                  }
            }
        })
        console.log(count);
     const attendanceData=await attendance.findAll({
                  where:{
                        aDate:date1
                  }
            });
            if(count>0) {
                  res.status(200).json({data:attendanceData,marked:"marked"});
            } else res.status(200).json({data:attendanceData,marked:"unmarked"});
  }
      }catch(err){
      console.log(err);
      }
};
//---------------------------------
exports.postAttendance=async(req,res,next)=>{
      console.log("---------------------");
      console.log("post attendance function");
      var data;

          try{ console.log(req.body);
            
           for(var i=0;i<req.body.length;i++){
            const name=req.body[i].name;
            const attendance1=req.body[i].attendance;
            console.log("date");
            console.log(req.body[i].aDate);
            console.log("new date object");
            const day=new Date(req.body[i].aDate);
            console.log(typeof(day));
             data= await attendance.update(
                  {attendance:attendance1},
                  {where:{
                    name:name,
                    aDate:day
                  }
            });
           }
      }catch(error){
            console.log(error);
      }
      res.status(200).json({alldata:data});
};
//-------------------------
exports.attendanceSummary=async(req,res)=>{
      const Summary=[]
      console.log("-------------------");
      console.log("in attendance Summary function");
      try{
      const data= await attendance.findAll({
              attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('aDate')), 'Dates']],
              where:{
                  attendance:['Present','Absent']
            }
     
            });
           
        const names1=await attendance.findAll({
            attributes:['name'],
            where:{
                  aDate:new Date(data[0].dataValues.Dates)
            }
        })
        console.log("check if names are printed");
        console.log( names1);
        console.log(names1.length);
        let presenty=0;
          for(let i=0;i<names1.length;i++){
            presenty=0;
            for(let j=0;j<data.length;j++){
                 const counting= await attendance.findAll({
                        where:{
                              aDate:new Date(data[j].dataValues.Dates),
                              name:names1[i].dataValues.name,
                              attendance:"Present"
                        }
                  });
                  console.log(counting);
                  presenty+=counting.length;
                  console.log(data[j].dataValues.Dates);
                  console.log(names1[i].dataValues.name);
                  console.log("value of presnty");
                  console.log(presenty);
             }

             const obj={
                  name:names1[i].dataValues.name,
                  presenty:presenty
             }
             console.log("following is  data object ")
             console.log(obj);
             Summary[i]=obj;

          }
      console.log("following is summary array");
      console.log(Summary);
      res.status(200).json({Summary:Summary,totalAttendance:data.length});

    
}catch(error){
      console.log("fetching data error");
      console.log(error);
}
};
