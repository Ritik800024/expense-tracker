const express=require('express')

const authentication=require('../middleware/auth')
const purchasecontroller=require('../controllers/purchase')

const router=express.Router()

router.post('/premiummembership',authentication,purchasecontroller.purchasepremium)

router.post('/updatetransactionstatus',authentication,purchasecontroller.updatetransactionstatus)

module.exports=router
