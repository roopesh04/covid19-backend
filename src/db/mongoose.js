const mongoose=require('mongoose')
require('dotenv').config()

url=process.env.URL
mongoose.connect(url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})