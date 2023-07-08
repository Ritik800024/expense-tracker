const Razorpay=require('razorpay')
const Order= require('../models/orders_models')

exports.purchasepremium=('',async (req,res)=>{
    var rzp=new Razorpay({
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_KEY_SECRET
    })

    const amount=2500
    rzp.orders.create({amount,currency:"INR"})
    .then((order) => {
        if (req.user) {
            req.user.createOrder({orderid:order.id,status:"PENDING",})
                .then(() => {
                    res.status(201).json({order,key_id:rzp.key_id})
                })
                .catch((err) => {
                    throw new Error(err)
                })
        } else {
            console.error('User object is undefined')
        }
})
})

exports.updatetransactionstatus=(req,res)=>{
    
}