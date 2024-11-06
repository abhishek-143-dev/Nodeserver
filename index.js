const express=require("express");

const session=require("express-session");
const bodyparser=require("body-parser");
const cookieparser=require("cookie-parser")
const Cors=require("./Class/Mode")
const Options=new Cors();
const Auth = require("./Routes/Auth");
const cors=require("cors");
const app=express();
const csrf=require("csurf");

const dotenv=require('dotenv').config();
const Task=require("./Routes/Task")

let csrfProtection = csrf({ cookie: true });


app.use(session({
  secret: process.env.SESSION_SECRET,  
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
      secure: false,
      sameSite: true,
      maxAge: 600000 // Time is in miliseconds
  }
}))
app.use(cookieparser())

app.use(csrf());

app.use(function (req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.locals.csrftoken = req.csrfToken();
  next();
});

app.use(bodyparser.json({extend:true}));
app.use(bodyparser.urlencoded({extended:true}))
app.use(cors(Options.Corsoptions()))



app.use("/auth",Auth)

app.use("/task",Task)

const port=process.env.PORT || 3000;


app.listen(port,()=>{
    
    console.log(`server is running at port:${port}`);
})