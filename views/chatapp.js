const token=localStorage.getItem('token');
let lastTimestamp=null;
function handleSubmit(event){
    event.preventDefault();
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
        updateLocalStorage(response.data.message);
        showMessageOnScreen(response.data.message);
    }).catch(error=>{
        console.log(error);
    })
}
function updateLocalStorage(messageInfo){
    let messageArr2=JSON.parse(localStorage.getItem('message'));
        console.log('messageArr2');
        console.log(messageArr2);
        if(messageArr2.length<10){
            messageArr2.push(messageInfo);
            localStorage.removeItem('message');
            localStorage.setItem('message',JSON.stringify(messageArr2));

        }else{
            messageArr2.shift();
            messageArr2.push(messageInfo);
            localStorage.removeItem('message');
            localStorage.setItem('message',JSON.stringify(messageArr2));

        }

}
window.addEventListener('DOMContentLoaded',()=>{
    console.log('in domcontentloader');
    const token=localStorage.getItem('token');
    console.log('localStorage.message');
    console.log(localStorage.message);
    if(!localStorage.message){
        console.log('in if part');
     axios.get("http://localhost:3000/get-messages",{headers:{
        "Authorization":token
}})
    .then(response=>{
        console.log(response);
        let MessageArr1=new Array();
        response.data.Messages.forEach((element,index) => {
            console.log(element);
            MessageArr1.push(element);
            showMessageOnScreen(element);

        });
        localStorage.setItem('message',JSON.stringify(MessageArr1));
  
    }).catch(error=>{
        console.log(error);
    })
}else{
    console.log('in else part');
    let messageArr2=localStorage.getItem('message');
     console.log('messageArr2');
     console.log(JSON.parse(messageArr2));
     JSON.parse(messageArr2).forEach(element=>{
           showMessageOnScreen(element);
     })
}
})
const fetchData = async () => {
    console.log('in fect Api');
    let messageArr1=JSON.parse(localStorage.getItem('message'));
    messageId=messageArr1[messageArr1.length-1].id;
    try {
       const response = await axios.get(`http://localhost:3000/get-messages?messageId=${messageId}`,{headers:{
        "Authorization":token
}}); 
console.log('fetch response');
console.log(response);
    for(var i=0;i<response.data.Messages.length;i++){
           updateLocalStorage(response.data.Messages[i]);
            showMessageOnScreen(response.data.Messages[i]);
        }
        
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // Call the API every 1 second
 const interval = setInterval(fetchData, 10000);

function showMessageOnScreen(MessageData){
    const table=document.getElementById('message-screen');
    const tbody=table.getElementsByTagName('tbody')[0];
    const row = document.createElement('tr');
      row.innerHTML = `
               <td>${MessageData.chatUser.Name}:${MessageData.Messages}</td>`
               tbody.appendChild(row);       
}