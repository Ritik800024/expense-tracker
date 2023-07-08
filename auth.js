const jwt=require('jsonwebtoken')

const authorization= (req,res,next)=>{
    const token= req.headers['authorization']
    console.log(token)
    const decode=jwt.verify(token,'kjbdbdqwidqd654635465dq4q4d6qw4d65q4wd6qw4d64qw68d4q54d65q4d31qww65d46qww4d45d4123as5d8w2224544xdcfs')
    req.user={
        id:decode.userid
    }
    next()
}

module.exports=authorization
