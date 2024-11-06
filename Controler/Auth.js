const Execute = require("../Class/Mode");
const sessionStorage = require("sessionstorage-for-nodejs");
const Mode = require("../Class/Mode");
const Jwt = require("../Class/Jwt")
const cookieparser = require("cookie-parser")
const validators = require("../Class/Validators");


const Login = async (req, res) => {
    try {
        const { password, username } = req.body;
        const mode = new Mode();
        const Querry = `Select * from User where Username='${username}'`
        const data = await mode.Execute(Querry)
        if (data.length > 0 && data.length < 2) {
            const depassword = await mode.Decrypt(data[0].Password);
            if (depassword == password) {
                const token = new Jwt();
                const payload = {
                    Username: data[0].Username,
                    Role: data[0].Role

                }
                const jwtacces = await token.generateToken(payload);
                res.cookie('Accestoken', jwtacces, {
                    httpOnly: true,
                    secure: false,
                    sameSite: true,
                    maxAge: 6000000 // Time is in miliseconds
                });
                const jwtrefresh = await token.refreshToken(payload);
                res.cookie('RefreshToken', jwtrefresh, {
                    httpOnly: true,
                    secure: false,
                    sameSite: true,
                    maxAge: 600000 // Time is in miliseconds
                });
                res.status(200).json({ message: "Login Success" });
            } else {
                res.status(400).json({ message: "Invalid Password" });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}
const Register = async (req, res) => {
    try {
        const { password, username, name, email, phone } = req.body;
        const role = "User";
        const valid = new validators();

        if (valid.isEmail(email) == false || valid.isName(name) == false || valid.isPassword(password) == false || valid.isPhone(phone) == false) {
            res.status(400).json({ message: "Invalid Data" });
        } else {
            const mode = new Mode();
            const encryptpassword = await mode.Encrypt(password);
            const Querry = "Select * from User where Username='" + username + "'"
            const userdata = await mode.Execute(Querry);
            if (userdata.length > 0) {
                res.status(400).json({ message: "User Already Exist" });
            }
            else {
                Querry = `Insert into User(Username,Password,Role,Email,createdAt) values('${username}','${encryptpassword}','${role}','${name}','${email}',getdate())`
                const data = await mode.Execute(Querry);
                if (data.rowsAffected > 1) {
                    res.status(200).json({ message: "Register Success" });
                } else {
                    res.status(400).json({ message: "Register Failed" });
                }
            }
        }



    }
    catch (error) {
        console.log(error);
    }
}
const ForgetPassword = async (req, res) => {
    try {
        const { email, username } = req.body;
        var valid = new validators();
        if (valid.isEmail(email) == false || valid.isUsername(username) == false) {
            res.status(400).json({ message: "Invalid Data" });
        } else {


            const mode = new Mode();
            const Querry = `Select * from User where Email='${email}' and Username='${username}'`
            const data = await mode.Execute(Querry);
            if (data.length > 0 && data.length < 2) {
                const token = new Jwt();
                const payload = {
                    Username: data[0].Username,
                    Role: data[0].Role

                }
                const Forgettoken = await token.generateToken(payload);


            } else {
                res.status(400).json({ message: "Invalid Email" });
            }
        }
    }
    catch (error) {

    }
}

const ResetPassword = async (req, res) => {
    try {
        var token=req.body.token;
        var password=req.body.password;
        var valid = new validators();
        if (valid.isPassword(password) == false) {
            res.status(400).json({ message: "Invalid Data" });
        } else {
            const mode = new Mode();
            const tokens = new Jwt();
            const payload = await tokens.verifyToken(token);
            const encryptpassword = await mode.Encrypt(password);
            const Querry = `Update User set Password='${encryptpassword}' where Username='${payload.Username}'`
            const data = await mode.Execute(Querry);
            if (data.rowsAffected > 0) {
                res.status(200).json({ message: "Password Reset Success" });
            } else {
                res.status(400).json({ message: "Password Reset Failed" });
    }
}
    }
    catch (error) {

    }
}

const Logout = async (req, res) => {
    try {
        res.clearCookie('Accestoken');
        res.clearCookie('RefreshToken');
        res.status(200).json({ message: "Logout Success" });
    }
    catch (error) {

    }
}
const Verifyauth = async (req, res) => {
    try {
        const token = req.cookies.Accestoken;
        const jwtverify = new Jwt();
        const payload = await jwtverify.verifyToken(token);
        if (payload) {
            const jwtrefresh = await jwtverify.refreshToken(payload);
                res.cookie('RefreshToken', jwtrefresh, {
                    httpOnly: true,
                    secure: false,
                    sameSite: true,
                    maxAge: 600000 // Time is in miliseconds
                });
            
        } else {
            res.status(400).json({ message: "Invalid Token" });
        }
    }
    catch (error) {

    }
}
module.exports = { Login, Register, ForgetPassword, ResetPassword, Logout, Verifyauth }