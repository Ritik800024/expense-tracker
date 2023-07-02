const Expense=require('../models/expense')
const jwt=require('jsonwebtoken')

exports.addexpense=('/addexpense',async (req,res)=>{
    const expense=req.body.expense
    const description=req.body.desc
    const category=req.body.category
    const date_of_expense=req.body.date_of_expense

    const data=await Expense.create({
        expense,
        description,
        category,
        date_of_expense
    })
    res.status(200).json({newexpense:data})
})

exports.deleteexpense=('/deleteexpense',async (req,res)=>{
    const token=req.headers['authorization']
    console.log(token)
    const decode=jwt.verify(token,'kjbdbdqwidqd654635465dq4q4d6qw4d65q4wd6qw4d64qw68d4q54d65q4d31qww65d46qww4d45d4123as5d8w2224544xdcfs')
    await Expense.destroy({
        where:{
            exUserId:decode.userid
        }
    })
})

exports.getallexpense=('/getallexpense',async (req,res)=>{
    const token=req.headers['authorization']
    console.log(token)
    const decode=jwt.verify(token,'kjbdbdqwidqd654635465dq4q4d6qw4d65q4wd6qw4d64qw68d4q54d65q4d31qww65d46qww4d45d4123as5d8w2224544xdcfs')
    const data=await Expense.findAll({
        where:{
            exUserId:decode.userid
        }
    })
    res.status(200).json({allexpense:data})
})