
const Execute=require('../Class/Mode');

const validators=require('../Class/Validators');


const CreateTask=async(req,res)=>{
    try{
        var {title,description,priority,dueDate,status,createdBy,updatedBy}=req.body;
        var valid=new validators();
        if(valid.isString(Task)==false){
            res.status(400).json({message:"Invalid Data"});
        }else{
            const mode=new Execute();
            const Querry=`Insert into Task(title,description,priority,dueDate,status,createdBy,updatedBy) values('${title}','${description}','${priority}',replace(convert(varchar,'${dueDate}',106),' ','-'),'${status}','${createdBy}','${updatedBy}')`;
            const data=await mode.Execute(Querry);
            if(data.rowsAffected>0){
                res.status(200).json({message:"Task Created"});
            }else{
                res.status(400).json({message:"Task Creation Failed"});
            }
        }
    }
    catch(error){

    }
}

const DeleteTask=async(req,res)=>{
    try{
        var id=req.params.id;
        var valid=new validators();
        if(valid.isNumber(id)==false){
            res.status(400).json({message:"Invalid Data"});
        }else{
            const mode=new Execute();
            const Querry=`Delete from Task where id=${id}`;
            const data=await mode.Execute(Querry);
            if(data.rowsAffected>0){
                res.status(200).json({message:"Task Deleted"});
            }else{
                res.status(400).json({message:"Task Deletion Failed"});
            }
        }
    }
    catch(error){

    }
}

const GetTask=async(req,res)=>{
    try{
        const mode=new Execute();
        const Querry=`Select * from Task`;
        const data=await mode.Execute(Querry);
        if(data.length>0){
            res.status(200).json({data:data});
        }else{
            res.status(400).json({message:"No Task Found"});
        }
    }
    catch(error){

    }
}
const GetTaskbyid=async(req,res)=>{
    try{
        const mode=new Execute();
        const Querry=`Select * from Task where id=${req.params.id}`;
        const data=await mode.Execute(Querry);
        if(data.length>0){
            res.status(200).json({data:data});
        }else{
            res.status(400).json({message:"No Task Found"});
        }
    }
    catch(error){

    }
}


const UpdateTask=async(req,res)=>{
    try{
        var id=req.params.id;
        var Task=req.body.Task;
        var valid=new validators();
        if(valid.isNumber(id)==false || valid.isString(Task)==false){
            res.status(400).json({message:"Invalid Data"});
        }else{
            const mode=new Execute();
            const Querry=`Update Task set Task='${Task}' where id=${id}`;
            const data=await mode.Execute(Querry);
            if(data.rowsAffected>0){
                res.status(200).json({message:"Task Updated"});
            }else{
                res.status(400).json({message:"Task Updation Failed"});
            }
        }
    }
    catch(error){

    }
}

module.exports={
    CreateTask,
    DeleteTask,
    GetTask,
    UpdateTask,
    GetTaskbyid
}