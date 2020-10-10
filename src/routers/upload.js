const express=require('express')
const Data=require('../models/data')
const router=new express.Router()

var OutputData=function(filter){
    Data.find(filter,function(err,result){
        if(err){
            return err
        }
        else{
            console.log(result)
            return result
        }
    })
}


// Data.find({reportedOn:"03/02/2020"},function(err,result){
//     if(err){
//         console.log(err)
//     }else{
//         console.log(result)
//     }
// })

var getrequiredformate=function(Given_Date){
    var year=Given_Date.getFullYear()
    var month=Given_Date.getMonth()
    if(month<10){
        month="0"+month
    }
    var date=Given_Date.getDate()
    if(date<10){
        date="0"+date
    }
    var final_format=date+"/"+month+"/"+year
    return final_format
}

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
    fresh_date=[]
    dates.forEach((date)=>{
        fresh_date.push(getrequiredformate(date))
    })
    return fresh_date
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
    const body=req.body
    const StartingDate=body["start"]
    const EndingDate=body["end"]
    const filter=body["filter"]

    var allthedates=getDates(new Date(StartingDate["year"],StartingDate["month"],StartingDate["day"]),new Date(EndingDate["year"],EndingDate["month"],EndingDate["day"]))

    const filtered_data=await Data.findbythedetails(allthedates,filter)

    output_data=[]
    
    allthedates.forEach(element=>{
        const Recovered=0
        const Hospitalized=0
        const Deceased=0
        var i=0
        filtered_data[i].forEach(inner_element=>{
            if(inner_element=="Recovered"){
                Recovered=Recovered+1
            }
            if(inner_element=="Hospitalized"){
                Hospitalized=Hospitalized+1
            }
            if(inner_element=="Deceased"){
                Deceased=Deceasedd+1
            }
        })
        seperate_data={
            "Recovered":Recovered,
            "Hospitalized":Hospitalized,
            "Deceased":Deceased,
            "Date":element
        }
        output_data.push(seperate_data)
        i=i+1
    })
    console.log(output_data)
    res.send(output_data)
})

module.exports=router