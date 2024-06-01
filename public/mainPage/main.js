const token=localStorage.getItem('token');
window.addEventListener('DOMContentLoaded',()=>{
    
    axios.get("http://localhost:3000/get-groups",{headers:{
        "Authorization":token}})
    .then(response=>{
        console.log('response of get groups');
        console.log(response);
        response.data.groupData.forEach(element=>{
        showMessageOnScreen(element);
        })

    }).catch(error=>{
        console.log(error);
    })
})
function showMessageOnScreen(groupData){
    const table=document.getElementById('message-screen');
    const tbody=table.getElementsByTagName('tbody')[0];
    const row = document.createElement('tr');
    console.log('groupData');
    console.log(groupData);
    console.log('JSON.stringify(groupData)');
    console.log(JSON.stringify(groupData));
    const stringifyGroupData=JSON.stringify(groupData); 
    console.log(stringifyGroupData);
        
         row.innerHTML = `
               <td>${groupData.Group.name}<span style="display: none;">${stringifyGroupData}</span></td>`
               row.onclick=()=>getgroup(row);
               tbody.appendChild(row);       
}
const CreateGroup=document.getElementById("CreateGroup");

CreateGroup.addEventListener("click",function(){
  window.location.href='../GroupEntryPoint/entry.html'
})
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
    console.log('data');
    console.log(data);
    const groupDetails=data.children[0].childNodes[1];

    console.log(data.children[0].childNodes[0]);
    console.log(data.children[0].childNodes[1].innerHTML);
    const stringGroupDetails=JSON.parse(groupDetails.innerHTML);
    console.log(stringGroupDetails);
    
    console.log('stringGroupDetails');
    console.log(stringGroupDetails);
    const obj={
        groupDetails:stringGroupDetails
    }
    axios.post("http://localhost:3000/group-entry",obj,{
        headers:{"Authorization":token}})
    .then(response=>{
        console.log(response);
        localStorage.setItem('groupData',JSON.stringify(response.data.groupData[0]));
        localStorage.setItem('grouptoken',response.data.grouptoken);
       window.location.href="../chatapp.html";
    }).catch(error=>{
        console.log(error);
    })

    
}
const notifications=document.getElementById('notifications');
notifications.addEventListener('click',(event)=>{
    event.preventDefault();
    console.log('I am in notifications event Listener');
    window.location.href='../notifications/joingroup.html'
    axios.get('http://localhost:3000/get-notifications');
})