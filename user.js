const User=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.adduser=('/adduser',async (req,res)=>{
    const name =req.body.name;
    const email=req.body.email;
    const pass=req.body.pass;
        if(isvalid(name)==true && isvalid(email)==true && isvalid(pass)==true){ 
            if(await userexist(email) == false){
                const saltrounds=10
                bcrypt.hash(pass,saltrounds,async(err,hash)=>{
                    await User.create({
                        name,
                        email,
                        pass:hash
                 })
                 res.status(201).json({message:'user signed in succesfully.'})
                })
            }
            else{
                res.status(409).json({sucess:false, message:'User already exist'})
            }
        }
        else{
            res.status(400).json({success:false, message:'Please fill all the columns.'})
        }
})


exports.getalluser=('/alluser', async (req,res)=>{
    const data=await User.findAll()
    res.status(200).json({alluser:data})
})


exports.finduser=('/finduser',async (req,res)=>{
    const email=req.body.email
    const pass=req.body.pass
    if(isvalid(email)==true && isvalid(pass)==true){
        if(await userexist(email)==true){
            const data=await User.findAll({
                where:{
                    email:email
                }
            })
            bcrypt.compare(pass,data[0].pass,(err,result)=>{
                if(!err){
                    res.status(200).json({success:true, message:"User loged in successfully", token:generateAccessToken(data[0].id)})
                }
                else{
                    res.status(401).json({success:false,message:"Incorrect password"})
                }
            })
        }
        else{
            res.status(404).json({success:false, message:"user dosen't exist"})
        }
    }
    else{
        res.status(400).json({sucess:true,message:"please fill all the columns"})
    }
})

function isvalid(string){
    if(string.length>0){
        return true
    }
    return false 
}

async function userexist(email){
    const data =await User.findAll({
        where:{
            email:email
        }
    })
    if(data.length>0){
        return true
    }
    else{
        return false
    }
}

function generateAccessToken(id){
    return jwt.sign({userid:id},'kjbdbdqwidqd654635465dq4q4d6qw4d65q4wd6qw4d64qw68d4q54d65q4d31qww65d46qww4d45d4123as5d8w2224544xdcfs')
}