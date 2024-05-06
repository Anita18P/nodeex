function handleSubmit(event){
    event.preventDefault();
    const Email=event.target.Email.value;
    const Password=event.target.Password.value;

    console.log("I am in  login page handle Submit function ");
    const userDetails={
        Email:Email,
        Password:Password
    }
    axios.post("http://35.172.192.240:3000/user-login", userDetails)
    .then(response=>{
        console.log(response);
        //window.alert(`${response.data.message}`);
        localStorage.setItem('token',response.data.token);
        window.location.href='../expense/expense.html';


    }).catch(error=>{
        console.log(error);
        const errorHeading = document.getElementById("msg");
         console.log(errorHeading);
        errorHeading.textContent="Error:"+`${error.message}`;
        // console.log(errorHeading);
    })

}