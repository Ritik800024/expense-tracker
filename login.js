var form=document.getElementById('form-content1')

form.addEventListener('submit',validate)

async function validate(){
    event.preventDefault()
    const email=event.target.Email.value
    const pass=event.target.Pass.value
    var emailexist=false
    await axios.get('http://localhost:1478/user/alluser')
    .then((res)=>{
        for(let i=0;i<res.data.alluser.length;i++){
            if(res.data.alluser[i].email===email){
                var user=res.data.alluser[i]
                emailexist=true
            }
        }
        if(emailexist===true){
            if(user.pass===pass){
                alert('loged in sucessfully')
            }
            else{
                alert('incorrect password')
            }
        }
        else{
            alert("user dosen't exist")
        }
    })

}