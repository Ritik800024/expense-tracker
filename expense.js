var form=document.getElementById('form-content1')
form.addEventListener('submit',addexpense)


async function addexpense(){
    event.preventDefault()
    var expense=event.target.Expense.value
    var desc=event.target.Desc.value
    var category=event.target.Cat.value
    var date_of_expense=event.target.Exdate.value

    const obj={
        expense,
        desc,
        category,
        date_of_expense
    }

    await axios.post('http://localhost:1478/expense/addexpense',{
        headers:
        {
            authorization:localStorage.getItem('token')
        }
    },obj)
    .then((res)=>{
        showoutput(res.data.newexpense)
    })
  }



function showoutput(obj){
    var table=document.getElementById('extable')
    var tr=document.createElement('tr')
    var td1=document.createElement('td')
    var td2=document.createElement('td')
    var td3=document.createElement('td')
    var td4=document.createElement('td')
    
    td1.appendChild(document.createTextNode(obj['expense']))
    td2.appendChild(document.createTextNode(obj['description']))
    td3.appendChild(document.createTextNode(obj['category']))
    td4.appendChild(document.createTextNode(obj['date_of_expense'].split('T')[0]))
    var deletebtn=document.createElement('button')
    deletebtn.appendChild(document.createTextNode('delete'))
    deletebtn.addEventListener('click',(e)=>{
        deleteexpense(obj['id'])
        var tr=e.target.parentElement
        table.removeChild(tr)
    })
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(deletebtn)
    table.appendChild(tr)
}

window.addEventListener('DOMContentLoaded',async ()=>{
    await axios.get('http://localhost:1478/expense/getallexpense',{
        headers:
        {
            authorization:localStorage.getItem('token')
        }
    })
    .then((res)=>{
    for(let i=0;i<res.data.allexpense.length;i++){
        showoutput(res.data.allexpense[i])
    }
    })
})

async function deleteexpense(id){
    await axios.delete(`http://localhost:1478/expense/deleteexpense/${id}`,{
        headers:
        {
            authorization:localStorage.getItem('token')
        }
    })
}

var rzp_btn=document.getElementById('premium')
rzp_btn.addEventListener('click',async ()=>{
    const response=await axios.post('http://localhost:1478/purchase/premiummembership',{
        headers:
        {
            authorization: localStorage.getItem('token')
        }
    })
    var options={
        "key":response.data.key_id,
        "order_id":response.data.order_id,
        "handler":async function(response){
            await axios.post('http://localhost:1478/purchase/updatetransactionsatus',{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id
            },{headers:{Authorization:token}})
            
            alert('You are a premium user now.')
        }
    }

})