function handleSubmit(event){
    event.preventDefault();
    const Name=event.target.Name.value;
    console.log(Name);
    const  Email=event.target.Email.value;
    console.log(Email);
    const   PhoneNumber=event.target.Phone.value;
    const   Password=event.target.Password.value;
    console.log( Password);
    const userDetails={
        Name:Name,
        Email:Email,
        PhoneNumber:PhoneNumber,
        Password:Password,
    }
    console.log(userDetails);
    axios.post("http://localhost:3000/sign-up",userDetails)
    .then(response=>{
        console.log(response);
        alert(`${response.data.message}`);
    })
    .catch(error=>{
        console.log(error);
    })
}