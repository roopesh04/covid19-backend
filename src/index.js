const express=require("express")
require('./db/mongoose')
const morgan = require('morgan');
const bodyParser=require('body-parser')
const dataRouter=require('./routers/upload')
const uploadRouter=require("./routers/pdf_converter")
const exphbs = require('express-handlebars');
var cors = require('cors')

const app=express()
app.use(morgan('dev'));
const port =process.env.PORT || 3001

//Static Folder
app.use('/public', express.static('.../VIT-Hack-Front/public'))


//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(dataRouter)
app.use(uploadRouter)


app.get('/',function(req,res){
    res.send("It is working")
})

app.post('/send',(req,res)=>{
  console.log(req.body);
})

app.listen(port,()=>{
    console.log("Server is up on the port "+port)
})