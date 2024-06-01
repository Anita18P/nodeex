

const create=document.getElementById("CreateGroup");
create.addEventListener("click",function(){
    const token=localStorage.getItem("token");
    console.log(token);
    const GroupName={
        GroupName:document.getElementById("groupName").value
    }
    document.getElementById("groupName").value="";
    console.log(GroupName);
    axios.post('http://localhost:3000/createGroup',GroupName,{
        headers:{Authorization :token}
    }).then((response)=>{
        console.log(response);
        localStorage.setItem('groupData',JSON.stringify(response.data.GroupData));
        window.location.href='../chatapp.html';
    })
})