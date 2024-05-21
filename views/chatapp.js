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
        lastTimestamp=response.data.Messages[response.data.Messages.length-1].createdAt;
        response.data.Messages.forEach(element => {
            showMessageOnScreen(element);
        });
    }).catch(error=>{
        console.log(error);
    })
})
const fetchData = async () => {
    try {
       const response = await axios.get('http://localhost:3000/get-messages',{headers:{
        "Authorization":token
}}); 
const table=document.getElementById('message-screen');
const tbody=table.getElementsByTagName('tbody')[0];
      tbody.replaceChildren();
        for(var i=0;i<response.data.Messages.length;i++){
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
    console.log(table);
    const tbody=table.getElementsByTagName('tbody')[0];
    const row = document.createElement('tr');
      row.innerHTML = `
               <td>${MessageData.chatUser.Name}:${MessageData.Messages}</td>`
               tbody.appendChild(row);       
}