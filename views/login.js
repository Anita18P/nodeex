function handleSubmit(event){
    event.preventDefault();
    const Email=event.target.Email.value;
    const Password=event.target.Password.value;
    const userDetails={
        Email:Email,
        Password:Password
    }
    console.log(userDetails);
    axios.post("http://localhost:3000/user-login",userDetails)
    .then(response=>{
        console.log(response);
        localStorage.setItem("token",response.data.token);
        //alert(`${response.data.message}`);
        window.location.href='../views/chatapp.html';
    }).catch(error=>{
        console.log(error);
    });
}