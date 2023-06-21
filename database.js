const Sequelize=require('sequelize')

const sequelize=new Sequelize('node-complete','root','ritik800024',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize