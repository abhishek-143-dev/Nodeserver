const express=require("express");
const Sql=require("mssql");
const Config=require("../DB/DB")
const sessionStorage = require("sessionstorage-for-nodejs");
const Mode=require("../Class/Mode");




  
  const getJobData=async()=> {
  
    
    
  }
  
  
 const Main=async(req,res)=>{
  try {
   
    var Querry = "Select top(1) Row_Number() Over(order BY Slno)Sno , * from DMSTran..ECN"
    const Dbexecute = new Mode("");
    const data = await Dbexecute.Execute(Querry)
    
    
   
    res.status(200).json({massage:"Success",data:data});
  }
  catch (error) {
    console.log(error);
  }
   
}
const  Second= async(req,res)=>{


    var Querry="Select top(1) Row_Number() Over(order BY Slno)Sno , * from DMSTran..ECN"
   
    const mode=new Mode();
 
    const data = await mode.Execute(Querry);
    const data1= await mode.Encrypt('abhi')
    const data2= await mode.Decrypt(data1)
    await sessionStorage.setItem("test",data2);
    
    res.status(200).json({massage:"Success",data:data});
    
}


module.exports={Main,Second,getJobData}