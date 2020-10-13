const mongoose=require('mongoose')
require('dotenv').config()

url=process.env.URL
mongoose.connect('mongodb+srv://testapp:roopesh123@cluster0.2zqrx.mongodb.net/vithack2020?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})