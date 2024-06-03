const token=localStorage.getItem('token');
const grouptoken=localStorage.getItem('grouptoken');
const groupData=JSON.parse(localStorage.getItem('groupData'));
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
     console.log(groupData);
     console.log(groupData.Group.name);
     const groupName=document.getElementById('groupName');
     groupName.innerHTML=groupData.Group.name;
    console.log('in domcontentloader');
    const table=document.getElementById('message-screen');
    const tbody=table.getElementsByTagName('tbody')[0];
    axios.get("http://localhost:3000/get-members",{
        headers:{"Authorization":token,
        "GroupAuthorization":grouptoken}
    }).then(response=>{
        console.log(response);
        response.data.data.forEach(element=>{
            showMembersOnScreen(element);
        })
    }).catch(error=>{
        console.log(error);
    })
    })
function showMembersOnScreen(MemberData){
    const userId=groupData.chatUserId;
    const table=document.getElementById('message-screen');
    const tbody=table.getElementsByTagName('tbody')[0];
    const row = document.createElement('tr');
    const adminBtn=document.createElement('button');
    adminBtn.className="AdminBtn";
    adminBtn.textContent="Make Admin";
    
    const removeBtn=document.createElement('button');
    removeBtn.className="removeBtn";
    removeBtn.textContent="Remove";
    if(groupData.Admin==true){
        if(MemberData.chatUserId==userId){
            row.innerHTML = `
            <td>You <span>Admin</span></td>`
            tbody.appendChild(row);
        }
        else{
            if(MemberData.Admin==true){
                row.innerHTML = `
                <td>${MemberData.memberName} <span class="spanAdmin">Admin</span></td>`
                tbody.appendChild(row);
            }
            else{
                let td=document.createElement('td');
                const StringifyMD=JSON.stringify(MemberData);
                td.innerHTML=`${MemberData.memberName}<span style="display: none;" class="memberData">${StringifyMD}</span>`;
                td.appendChild(adminBtn);
                td.appendChild(removeBtn);
                row.appendChild(td);
             tbody.appendChild(row);
             adminBtn.addEventListener('click',(event)=>{
                event.preventDefault();
                console.log("in admin event listener");
                console.log(event.target);
                console.log(event.target.parentElement);
                
                makeAdmin(event.target.parentElement);
        
            });
            removeBtn.addEventListener('click',(event)=>{
                event.preventDefault();
                console.log("in remove event listener");
                console.log(event.target);
                removeMember(event.target.parentElement);
        
            });
            }
           

    }
}
else{
        if(MemberData.chatUserId==userId){
            row.innerHTML = `
            <td>You</td>`
            tbody.appendChild(row);
        }
        else{
            if(MemberData.Admin==true){
                row.innerHTML = `
                <td>${MemberData.memberName} <span class="spanAdmin">>Admin</span></td>`
                tbody.appendChild(row);
            }
            else{
                row.innerHTML = `
             <td>${MemberData.memberName}</td>`
              tbody.appendChild(row);
    
            }
           

    }
    
   

 }
}
function makeAdmin(memberData){
    console.log('in make Admin Function');
    const data=JSON.parse(memberData.children[0].innerHTML);
                console.log(data);
    
    axios.put("http://localhost:3000/make-admin",data,{
        headers:{"Authorization":token,
            "GroupAuthorization":grouptoken
        }
    }).then(response=>{
        console.log(response);
        console.log(memberData.td);
        memberData.removeChild( memberData.children[1]);
        memberData.removeChild( memberData.children[1]);
        let sp=document.createElement('span');
        sp.innerHTML='Admin';
        sp.className="spanAdmin";
        console.log('typeof(sp)');
        console.log(typeof(sp));
        memberData.appendChild(sp);


    }).catch(error=>{
        console.log(error);
    })
}
function removeMember(memberData){
    console.log('in remove member function');
    console.log(memberData);
    const data=JSON.parse(memberData.children[0].innerHTML);
    console.log(data);

    axios.delete(`http://localhost:3000/remove-member?memberId=${data.id}`,{
        headers:{"Authorization":token,
        "GroupAuthorization":grouptoken}
    })
    .then(response=>{
        console.log(response);
        const table=document.getElementById('message-screen');
    const tbody=table.getElementsByTagName('tbody')[0];
    tbody.removeChild(memberData.parentElement);

    }).catch(error=>{
        console.log(error);
    })

}