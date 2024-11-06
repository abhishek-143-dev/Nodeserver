const express=require("express");

const router=express.Router();

const csrf = require('csurf');

let csrfProtection = csrf({ cookie: true });

const {Login,Logout,Register,ResetPassword,ForgetPassword,Verifyauth}=require("../Controler/Auth")

const {Verifyauthtoken,Verifyrefreshtoken}=require("../Midlewares/VerifyAuth")


router.get("/Login",Login)

router.post("/Register",Register)

router.post("/ForgetPassword",ForgetPassword)

router.post("/ResetPassword/:token",ResetPassword)

router.post("/Logout",Logout)

router.post("/Verifyauth",Verifyauthtoken,Verifyrefreshtoken,Verifyauth)




module.exports=router