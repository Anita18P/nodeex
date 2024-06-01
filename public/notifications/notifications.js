const token=localStorage.getItem('token');

window.addEventListener('DOMContentLoaded',()=>{
    console.log('In content Loader');
    axios.get("http://localhost:3000/get-notifications",{
        "headers":{"Authorization":token}
    })
    .then(response=>{
        console.log(response);
    }).catch(error=>{
        console.log(error);
    })
})