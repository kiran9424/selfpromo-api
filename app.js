const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv')
dotenv.config();

const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const categoryRoute = require('./routes/category');

const app = express();
app.use(express.json());

mongoose.connect(process.env.DB_URI,{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log('DB connected successfully'));

app.use('/api/v1',userRoute);
app.use('/api/v1',productRoute);
app.use('/api/v1/',categoryRoute);

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server started at port ${port}`);
    
})