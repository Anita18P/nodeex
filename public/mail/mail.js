function handleSubmit(event){
    event.preventDefault();
    console.log("in mail handle submit function")
    const Email=event.target.Email.value;

    axios.post("http://35.172.192.240:3000/password/forgotpassword",{data:Email})
    .then(response=>{
        console.log("response from forgot passwod api")
        console.log(response);
        if(response.status === 202){
document.body.innerHTML += '<div style="color:red;">Mail Successfuly sent <div>'
  } else {
throw new Error('Something went wrong!!!')
  }
    }).catch(err=>{
        console.log("error forgot pass api");
        console.log(err);
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    })

}