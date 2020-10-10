const express=require('express')
var fileupload=require('express-fileupload')
const ImagesToPDF = require('images-pdf');
var path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs=require('fs')
const morgan = require('morgan');
const _ = require('lodash');
const Data=require('../models/data');
const { result, sample } = require('lodash');
const file=new express.Router()

file.use(fileupload({
    createParentPath: true
}))

file.post('/upload',async(req,res,next)=>{
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
    let avatar = req.files.photo

    avatar.mv('./images/' + avatar.name);

    new ImagesToPDF.ImagesToPDF().convertFolderToPDF('images/', 'output/file.pdf');
    fs.unlink("./images/"+avatar.name,(err)=>{
        if(err){
            res.send(err)
        }
    })
    var file = "./output/file.pdf"

    res.status(200).download(file)

}
} catch (err) {
res.status(500).send(err);
}


    // const buffer_data=(file.data)

    // file.mv("/images/"+file.name,function(err,result){
    //     if(err){
    //         res.send(err)
    //     }else{
    //         sucess:"File uploaded"
    //     }
    // })

    // res.set('content-type','image/png').send(buffer_data)

    
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