const token=localStorage.getItem('token');
const grouptoken=localStorage.getItem('grouptoken');
function handleSubmit(event){
    event.preventDefault();
    console.log('in invite handleSubmit');
    const Name=event.target.Name.value;
    const PhoneNumber=event.target.Phone.value;
    const Email=event.target.Email.value;
    const obj={
        Name:Name,
        PhoneNumber:PhoneNumber,
        Email:Email,
    }
    console.log(obj);
    axios.get(`http://localhost:3000/get-user/${PhoneNumber}`,{
        "headers":{"Authorization":token,
        "GroupAuthorization":grouptoken
        }
    })
    .then(response=>{
        console.log(response);
        const obj={
            data:response.data
        }
        axios.post("http://localhost:3000/invite",obj,{
            "headers":{"Authorization":token,
            "GroupAuthorization":grouptoken
            }})
    }).then(response=>{
        console.log(response);
    }).catch(error=>{
        console.log(error);
    })


}


window.addEventListener('DOMContentLoaded',()=>{
    console.log("In window content loaded");
})