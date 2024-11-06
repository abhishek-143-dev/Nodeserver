const fs = require('fs');
const Sql=require("mssql")

const Config=require("../DB/DB")
var CryptoJS = require("crypto-js");
const dotenv=require('dotenv').config();
const bycrypt_secreat=process.env.BYCRYPY_SECREAT;
class Mode{
    constructor(){
        this.mode = 0;
        
    }
    setMode(mode){
        this.mode = mode;
    }
    getMode(){
        return this.mode;
    }
    async Execute(Querry){
      let  pool =  await Sql.connect(Config);
        try {
            let  data =  await pool.request().query(Querry);
            if(data.recordsets.length>0){
                pool.close();
                return  data.recordset;
            }else{
                return "empty"
            }
           
          }
          catch (error) {
            pool.close();
            console.log(error.code);
          }
          finally{
            pool.close();
          }
    }
    async Encrypt(password){
        try {
           
            let encryptdEmail = CryptoJS.AES.encrypt(password, bycrypt_secreat).toString();
            
            return encryptdEmail;
          }
          catch (error) {
            
          }
    }
    async Decrypt(password){
        try {
            var bytes =await CryptoJS.AES.decrypt(password, bycrypt_secreat);
            var decryptdEmail = await bytes.toString(CryptoJS.enc.Utf8);
            
            return decryptdEmail;
          }
          catch (error) {

          }
    }
    async Corsoptions(){
      let  corsOptions = {
            origin: ['http://192.168.25.204:3000','http://192.168.25.204:2000', 'http://192.168.25.204:3001', 'http://192.168.25.204:4000','http://localhost:3000','https://localhost:*'],
            methods: ["GET", "POST", "PUT", "DELETE",'PATCH'],
           
            credentials: true,
          };
          return corsOptions;
    }

    async Otpgenerator(){
        let otp = await Math.floor(100000 + Math.random() * 900000);
        return otp;
    }
    

}
module.exports = Mode;