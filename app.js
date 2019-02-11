const express = require( "express");

const morgan = require("morgan");
const bodyParser = require( "body-parser");
const cors = require( "cors");
const userRouter = require( "./api/routes/users");
const boardRouter = require ("./api/routes/boards");
const columnRouter = require( "./api/routes/columns");
const cardRouter = require( "./api/routes/cards");

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.options('*',cors());
app.use(cors());

app.use('/api/users',userRouter);
app.use('/api/boards',boardRouter);
app.use('/api/columns',columnRouter);
app.use('/api/cards',cardRouter);

app.use((req,res,next)=>{
   const error = new Error('no route found ');
   error.status=404;
   next(error);
});

app.use((error,req,res,next)=>{
   res
       .status(error.status || 500)
       .json({
           error:{
               message:error.message
           }})
});


module.exports =app;




