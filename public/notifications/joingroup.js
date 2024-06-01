const token=localStorage.getItem('token');
window.addEventListener('DOMContentLoaded',()=>{
    
    axios.get("http://localhost:3000/get-notifications",{headers:{
        "Authorization":token}})
    .then(response=>{
        console.log('response of get notifications');
        console.log(response);
         response.data.data.forEach(element=>{
        showMessageOnScreen(element);
        })

    }).catch(error=>{
        console.log(error);
    })
})
function showMessageOnScreen(notifiData){
    const table=document.getElementById('message-screen');
    const tbody=table.getElementsByTagName('tbody')[0];
    const row = document.createElement('tr');
    console.log('notifiData');
    console.log(notifiData);
    console.log('JSON.stringify(groupData)');
    console.log(JSON.stringify(notifiData));
    const stringifyNotifiData=JSON.stringify(notifiData); 
    console.log(stringifyNotifiData);
        
         row.innerHTML = `
               <td>${notifiData.link}<span style="display: none;">${stringifyNotifiData}</span></td>`
               row.onclick=()=>getgroup(row);
               tbody.appendChild(row);       
}
// const CreateGroup=document.getElementById("CreateGroup");

// CreateGroup.addEventListener("click",function(){
//   window.location.href='../GroupEntryPoint/entry.html'
// })
// const table=document.getElementById("message-screen");
// const tbody=document.getElementsByTagName('tbody');
// console.log('tbody');
// console.log(tbody);
// tbody.click= (e)=> {
//     console.log('in onclick function');
// // to find what td element has the data you are looking for
//     var tdele = e.target.parentNode.children[x].innerHTML;
//     console.log(tdele);
//     // to find the row

//     var trele = e.target.parentNode;
//     console.log(trele);
// }
function getgroup(data){
    console.log('i m in getgroup');
    //window.location.href='../chatapp.html'
    console.log('data');
    console.log(data);
    const notifiDetails=data.children[0].childNodes[1];

    console.log(data.children[0].childNodes[0]);
    console.log(data.children[0].childNodes[1].innerHTML);
    const stringNotifiDetails=notifiDetails.innerHTML;
    console.log('stringNotifiDetails');
    console.log(stringNotifiDetails);
    const obj={
        notifiDetails:stringNotifiDetails
    }
    console.log(obj);
    axios.post("http://localhost:3000/join-group",obj,{
        headers:{"Authorization":token}})
    .then(response=>{
        console.log('the response of joining group ');
        console.log(response);
    //     localStorage.setItem('groupData',JSON.stringify(response.data.groupData[0]));
    //     localStorage.setItem('grouptoken',response.data.grouptoken);
    //    window.location.href="../chatapp.html";
    }).catch(error=>{
        console.log(error);
    })

    
}
// const notifications=document.getElementById('notifications');
// notifications.addEventListener('click',(event)=>{
//     event.preventDefault();
//     console.log('I am in notifications event Listener');
//     window.location.href=''
//     axios.get('http://localhost:3000/get-notifications');
// })