const express=require("express");

const router=express.Router();

const {Main,Second}=require("../Controler/Main")




router.get("/cache",Main)

router.get("/test",Second)





module.exports=router