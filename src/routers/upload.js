const express=require('express')
const Data=require('../models/data')
const router=new express.Router()

var getDates = function(startDate, endDate) {
    var dates = [],
        currentDate = startDate,
        addDays = function(days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };

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

router.post('/get_filtered_data',async(req,res)=>{
    const data=req.body
    console.log(data)
    const StartingDate=data["start"]
    const EndingDate=data["end"]

    var allthedates=getDates(new Date(StartingDate["year"],StartingDate["month"],StartingDate["day"]),new Date(EndingDate["year"],EndingDate["month"],EndingDate["day"]))
    console.log(allthedates)

    try{
        res.send(allthedates)
    }catch(e){
        res.send(e)
    }
})

module.exports=router