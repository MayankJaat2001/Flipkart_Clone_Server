import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import DefaultData from './default.js';
import Router from './routes/route.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import {v4 as uuid} from 'uuid';
import Razorpay from 'razorpay';


dotenv.config();
const app=express();
   

const PORT = process.env.PORT || 8000;
const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;
Connection(username,password);
app.listen(PORT, ()=>console.log(`Server is running Successfully on PORT ${PORT}`));
DefaultData();

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_CLIENT_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });

export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use('/',Router); 

app.get('/getkey',(req,resp)=>{
  resp.status(200).json({key:process.env.RAZORPAY_CLIENT_KEY})
})

