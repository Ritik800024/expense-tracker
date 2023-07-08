const Expense=require('../models/expense_models')
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


exports.getallexpense=('/getallexpense',async (req,res)=>{
    const data=await Expense.findAll({
        where:{
            exUserId:req.user.id
        }
    })
    res.status(200).json({allexpense:data})
})

exports.deleteexpense=('/deleteexpense/:exid',async(req,res)=>{
    const id=req.params.exid
    const data=await Expense.destroy({
        where:{
            exUserid:req.user.id,
            id:id
        }
    })
})

