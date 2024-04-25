// import paytmchecksum from '../paytm/PaytmChecksum.js';
// import { paytmParams, paytmMerchantkey } from '../server.js';
import crypto from 'crypto'
import {instance} from '../index.js'
import {Payment} from '../model/payment-schema.js'




export const checkout=async(req,resp)=>{
const options = {
    amount: Number(req.body.amount*100),  // amount in the smallest currency unit
    currency: "INR",
  };
  const order = await instance.orders.create(options)
  resp.status(200).json({
    success:true,
    order,
  })
  }

export const paymentVerification=async(req,resp)=>{
  const {razorpay_order_id, razorpay_payment_id,razorpay_signature} = req.body
  const body = razorpay_order_id+"|"+razorpay_payment_id;


  const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET_KEY).update(body.toString()).digest("hex");
    console.log(razorpay_signature)
    console.log(expectedSignature)

    const isAuthentic = expectedSignature === razorpay_signature

    if(isAuthentic){
      await Payment.create({razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      })
      resp.redirect(`https://mayank-flipkartclone.netlify.app/paymentsuccess?reference=${razorpay_payment_id}`)
    }else{
      resp.status(400).json({
    success:false
  })
    }
  
  }


// export const addPaymentGateway = async (request, response) => {
//     const paytmCheckSum = await paytmchecksum.generateSignature(paytmParams, paytmMerchantkey);
//     try {
//         const params = {
//             ...paytmParams,
//             'CHECKSUMHASH': paytmCheckSum
//         };
//         response.json(params);
//     } catch (error) {
//         console.log(error);
//     }
// }
