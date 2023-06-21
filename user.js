const express=require('express')

const usercontroller=require('../controllers/user')

const router=express.Router();

router.post('/adduser',usercontroller.adduser)
router.get('/alluser',usercontroller.getalluser)

module.exports=router