const Jwt=require('jsonwebtoken');
const dotent=require('dotenv').config();
const secret=process.env.JWT_SECRET;

class JWT{
    constructor(){
        this.secret=secret;
    }
    async generateToken(data){
        try{
            const token= await Jwt.sign(data,this.secret);
            return token;
        }
        catch(error){
            console.log(error);
        }
    }
    async verifyToken(token){
        try{
            const data= await Jwt.verify(token,this.secret);
            return data;
        }
        catch(error){
            console.log(error);
        }
    }
    async decodeToken(token){
        try{
            const data= await Jwt.decode(token);
            return data;
        }
        catch(error){
            console.log(error);
        }
    }
    async refreshToken(load){
        try{
            const data= await Jwt.refresh(load,this.secret);
            return data;
        }
        catch(error){
            console.log(error);
        }
    }
}