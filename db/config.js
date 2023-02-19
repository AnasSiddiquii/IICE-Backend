const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/IICE-Portal') 
// const DB = 'mongodb+srv://IICE:IICE@cluster0.lvj2h1x.mongodb.net/IICE-Foundation?retryWrites=true&w=majority'

const DB = process.env.DATABASE

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{console.log('database connected successfully')
}).catch((err)=>console.log('database could not connect'))