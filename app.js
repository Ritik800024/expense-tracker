const express=require('express')
var cors=require('cors')

const sequelize=require('./util/database')

const bodyParser = require('body-parser')

const userroutes=require('./routes/user')
const expenseroutes=require('./routes/expense')

const app=express()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/user',userroutes)
app.use('/expense',expenseroutes)

sequelize.sync()
.then(result=>{
    app.listen(1478)
})
.catch(err=>{
    console.log(err)
})