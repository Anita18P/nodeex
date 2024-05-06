function handleSubmit(event){
    event.preventDefault();
    const Name=event.target.Name.value;
    console.log(Name);
    const  Email=event.target.Email.value;
    console.log(Email);
    const   Password=event.target.Password.value;
    console.log( Password);
    const userDetails={
        Name:Name,
        Email:Email,
        Password:Password,
    }
    axios.post("http://localhost:3000/sign-up",userDetails)
    .then(response=>{
        console.log(response);
        window.location.replace('../login/login.html');

    }).catch(err=>{
        console.log(err);
        const errorHeading = document.getElementById("msg");
         console.log(errorHeading);
        errorHeading.textContent="Error:"+`${err.message}`;
        console.log(errorHeading);
    
    });
}