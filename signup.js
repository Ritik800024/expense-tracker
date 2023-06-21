var form=document.getElementById('form-content1')
form.addEventListener('submit',adduser)

function adduser(e){
    event.preventDefault()
    const name=event.target.Name.value
    const email=event.target.Email.value
    const pass=event.target.Pass.value
    const obj={
        name,
        email,
        pass
    }
    axios.post('',obj)
    .then((res)=>{
        
    })
    .catch(err=>{console.log(err)})
}