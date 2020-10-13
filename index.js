const express=require("express")
require('./db/mongoose')
const morgan = require('morgan');
const bodyParser=require('body-parser')
const path=require('path');
const dataRouter=require('./routers/upload')
const uploadRouter=require("./routers/pdf_converter")
var cors = require('cors')
const nodemailer = require("nodemailer");

const app=express()
app.use(morgan('dev'));
const port =process.env.PORT || 3001

//View engine setup



//Static Folder
app.use(express.static(path.join(__dirname,'client/public')))


//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(dataRouter)
app.use(uploadRouter)

//Cors setup
app.use((req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});




app.post('/sendemail',(req,res)=>{
    console.log(req.body);
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'vjk2018@gmail.com', // generated ethereal user
          pass: 'kerlutvvdefgsust', // generated ethereal password
        },
      });
    
      // send mail with defined transport object
    let info= transporter.sendMail({
        from: '"Nodemailer Services by Dev.exe" <vjk2018@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Sending Mail from Nodemailer", // Subject line
        text: "your email id is "+req.body.email, // plain text body
        html: "", // html body 
      });
    
      console.log("Message sent: %s", info.messageId);
      
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
})

app.listen(port,()=>{
    console.log("Server is up on the port "+port)
})