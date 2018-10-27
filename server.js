
import mongoose from "mongoose";
import http from "http";
import app from "./app";


require('dotenv').config();



const port = process.env.process || 3002;
const server = http.createServer(app);


// Connecting to the DB
mongoose.promise=global.Promise;


mongoose.connect(process.env.MONGODB_CONNECT_LINK,{useNewUrlParser:true})
    .then(()=>{console.log('Database connected')})
    .catch(err=>console.log(err))





server.listen(port,()=>{
    console.log(`listening on ${port}`);
});