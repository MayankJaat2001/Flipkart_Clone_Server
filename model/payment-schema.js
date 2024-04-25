import mongoose from "mongoose";

const paymentschema = new mongoose.Schema({
    razorpay_order_id:{
        type:String,
        require:true
    },
    razorpay_payment_id:{
        type:String,
        require:true
    },
    razorpay_signature:{
        type:String,
        require:true
    }
})

export const Payment = mongoose.model("Payment",paymentschema)