const express=require('express')
var fileupload=require('express-fileupload')
const Data=require('../models/data')
const filetype=require('file-type')
const file=new express.Router()

file.use(fileupload())

file.post('/upload',async(req,res,next)=>{
    const file=req.files.photo
    console.log(file)
    const buffer_data=(file.data)

    res.set('content-type','image/png').send(buffer_data)

    // res.sendFile(req.files)
    // file.mv("/uploads/"+file.name,function(err,result){
    //     if(err)
    //     throw err
    //     res.send({
    //         success:true,
    //     message:"File uploaded",
    //     })
    // })
})

file.get('/getdata',async(req,res)=>{
    Data.find({status:"Deceased"},function(err,result){
        if (err){
            console.log(err)
        }else{
            final_data=[]
            result.forEach(element => {
                var date=element["reportedOn"].split('/')
                var myobj={
                    "date":date[0],
                    "month":date[1],
                    "year":date[2]
                }
                final_data.push(myobj)
            });
            res.send(final_data)
        }
    })

})

module.exports=file