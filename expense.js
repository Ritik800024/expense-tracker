const express=require('express')

const expensecontroller=require('../controllers/expense')

const router=express.Router()

router.post('/addexpense',expensecontroller.addexpense)

router.get('/getallexpense',expensecontroller.getallexpense)

router.delete('/deleteexpense/:expenseid',expensecontroller.deleteexpense)

module.exports=router;