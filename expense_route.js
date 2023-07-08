const express=require('express')

const expensecontroller=require('../controllers/expense_controller')

const authentication=require('../middleware/auth')

const router=express.Router()

router.post('/addexpense',authentication,expensecontroller.addexpense)

router.get('/getallexpense',authentication,expensecontroller.getallexpense)

router.delete('/deleteexpense/:exid',authentication,expensecontroller.deleteexpense)

module.exports=router;