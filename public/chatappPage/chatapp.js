const token=localStorage.getItem('token');
const grouptoken=localStorage.getItem('grouptoken');
const groupData=JSON.parse(localStorage.getItem('groupData'));
// const {socket}=require('socket.io');
const socket = io("http://localhost:3000");
console.log(socket);
console.log(socket.join);
console.log(socket.emit);
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
        "Authorization":token,
        "GroupAuthorization":grouptoken
}})
    .then(response=>{
        console.log(response);
        socket.emit("newMessage",response.data.message); 
       updateLocalStorage(response.data.message);
        showMessageOnScreen(response.data.message);
    }).catch(error=>{
        console.log(error);
    })
}
function updateLocalStorage(messageInfo){
    let groupName=JSON.parse(localStorage.getItem('groupData')).Group.name;
    console.log(groupName);
    let messageArr2=JSON.parse(localStorage.getItem(`${groupName}`));
        console.log('messageArr2');
        console.log(messageArr2);
        console.log(messageArr2.length);
        if(messageArr2.length<10){
            messageArr2.push(messageInfo);
            localStorage.removeItem(`${groupName}`);
            localStorage.setItem(`${groupName}`,JSON.stringify(messageArr2));

        }else{
            messageArr2.shift();
            messageArr2.push(messageInfo);
            localStorage.removeItem(`${groupName}`);
            localStorage.setItem(`${groupName}`,JSON.stringify(messageArr2));

        }

}
window.addEventListener('DOMContentLoaded',()=>{
    // io.socketsjoin(groupData.Group.name,()=>{
    //     console.log(`in ${groupData.Group.name} group `);
    // });
     console.log(groupData);
     console.log(groupData.Group.name);
     const groupName=document.getElementById('groupName');
     groupName.innerHTML=groupData.Group.name;
    console.log('in domcontentloader');
    socket.on("connect", () => {
        console.log("Connected to Socket.io server");
      });

    const token=localStorage.getItem('token');
        console.log(localStorage.getItem(groupData.Group.name));
        const messageArr1=JSON.parse(localStorage.getItem(groupData.Group.name)||null);
        console.log('messageArr1');
        console.log(messageArr1);
        if(messageArr1==null){
            console.log('in if part');
         axios.get("http://localhost:3000/get-messages",{headers:{
            "Authorization":token,
               "GroupAuthorization":grouptoken
    }})
        .then(response=>{
            console.log(response);
            let MessageArr1=new Array();
            response.data.Messages.forEach((element) => {
                console.log(element);
                MessageArr1.push(element);
                showMessageOnScreen(element);
    
            });
            localStorage.setItem(`${groupData.Group.name}`,JSON.stringify(MessageArr1));
      
        }).catch(error=>{
            console.log(error);
        })
    }else{
        console.log('in else part');
        let messageArr2=localStorage.getItem(`${groupData.Group.name}`);
         console.log('messageArr2');
         console.log(JSON.parse(messageArr2));
         JSON.parse(messageArr2).forEach(element=>{
            updateLocalStorage(element);
               showMessageOnScreen(element);
         })
    }
    
    socket.on('newMessage', (message) => {
        console.log('New message received:', message);
        showMessageOnScreen(message);
      });
    
    
})
const fetchData = async () => {
    console.log('in fetch Api');
    let messageArr1=JSON.parse(localStorage.getItem(`${groupData.Group.name}`));
    messageId=messageArr1[messageArr1.length-1].id;
    try {
       const response = await axios.get(`http://localhost:3000/get-messages?messageId=${messageId}`,{headers:{
        "Authorization":token,
        "GroupAuthorization":grouptoken
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
 //const interval = setInterval(fetchData, 10000);

function showMessageOnScreen(MessageData){
    const table=document.getElementById('message-screen');
    const tbody=table.getElementsByTagName('tbody')[0];
    const row = document.createElement('tr');
      row.innerHTML = `
               <td>${MessageData.chatUser.Name}:${MessageData.Messages}</td>`
               tbody.appendChild(row);       
}
const Invite=document.getElementById("Invite");

Invite.addEventListener("click",function(){
  window.location.href='../Invite/invite.html'
})
const Members=document.getElementById("memberBtn");
Members.addEventListener("click",function(){
    console.log('i m in members click function');
    window.location.href="../memberPage/member.html";
})
