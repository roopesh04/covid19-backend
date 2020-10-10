const express=require("express")
require('./db/mongoose')
const bodyPraser=require('body-parser')
const dataRouter=require('./routers/upload')
const uploadRouter=require("./routers/pdf_converter")

const app=express()
const port =3000 || process.env.PORT

app.use(bodyPraser.urlencoded({extended:true}))
app.use(express.json())
app.use(dataRouter)
app.use(uploadRouter)

app.listen(port,()=>{
    console.log("Server is up on the port "+port)
})