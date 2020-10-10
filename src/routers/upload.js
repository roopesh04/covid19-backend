const express=require('express')
const Data=require('../models/data')
const router=new express.Router()

router.post('/',async(req,res)=>{
    const data=new Data(req.body)

    try{
        await data.save()
        res.status(201).send()
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/csv_file',async(req,res)=>{
    Total_data=req.body
    try{
        Total_data.forEach(element => {
        const data=new Data(element)

        data.save()
        });
        res.status(201).send()
    }catch(e){
        res.send(400).send(e)
    }
})

module.exports=router