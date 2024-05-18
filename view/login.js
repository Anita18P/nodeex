function handleSubmit(event){
    event.preventDefault();
    const Email=event.target.Email.value;
    const Password=event.target.Password.value;
    const userDetails={
        Email:Email,
        Password:Password
    }
    console.log(userDetails);
    axios.get("http://localhost:3000/log-in",userDetails)
    .then(response=>{
        console.log(response);
        alert("Logged in successfully");
    }).catch(error=>{
        console.log(error);
    })
}