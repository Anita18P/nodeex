function handleSubmit(event){
    event.preventDefault();

    const token=localStorage.getItem('token');
    console.log('hello i m in handleSubmit');
    console.log(token);
    const message=event.target.message.value;
    document.getElementById('sendMessage').value="";
    const messageObj={
        message:message
    }
    console.log(message);
    axios.post("http://localhost:3000/send-message",messageObj,{headers:{
        "Authorization":token
}})
    .then(response=>{
        console.log(response);
        showMessageOnScreen(response.data.message);
    }).catch(error=>{
        console.log(error);
    })
}
window.addEventListener('DOMContentLoaded',()=>{
    const token=localStorage.getItem('token');
    axios.get("http://localhost:3000/get-messages",{headers:{
        "Authorization":token
}})
    .then(response=>{
        console.log(response);
        response.data.Messages.forEach(element => {
            showMessageOnScreen(element);
        });
    }).catch(error=>{
        console.log(error);
    })
})
function showMessageOnScreen(MessageData){
    const table=document.getElementById('message-screen');
    console.log(table);
    const tbody=table.getElementsByTagName('tbody')[0];
    const row = document.createElement('tr');
      row.innerHTML = `
               <td>${MessageData.chatUser.Name}:${MessageData.Messages}</td>`
               tbody.appendChild(row);       
}