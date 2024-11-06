const jwt=require("../Class/Jwt");




const Verifyauthtoken=async(req,res,next)=>{
    try {
        const token = req.cookies.Accestoken;
        const jwtverify = new jwt();
        const payload = await jwtverify.verifyToken(token);
        if (payload) {
            next();
        } else {
            res.status(400).json({ message: "Invalid Token" });
        }
    } catch (error) {
        res.clearCookie('Accestoken')
        res.clearCookie('RefreshToken')
        res.status(400).json({ message: "Invalid Token" });
    }
}
const Verifyrefreshtoken=async(req,res,next)=>{
    try {
        const token = req.cookies.RefreshToken;
        const jwtverify = new jwt();
        const payload = await jwtverify.verifyToken(token);
        if (payload) {
            next();
        } else {
            res.clearCookie('Accestoken')
            res.clearCookie('RefreshToken')
            res.status(400).json({ message: "Invalid Token" });
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
}


module.exports={Verifyauthtoken,Verifyrefreshtoken};