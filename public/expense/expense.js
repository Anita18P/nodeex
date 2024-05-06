const token=localStorage.getItem('token');
const nextButton = document.getElementById('next-btn');
const prevButton = document.getElementById('previous-btn');
const pageNum = document.getElementById('page-num');
const pagination = document.getElementById('pagination-container');
const rowsPerPageOption = document.getElementById('rows-per-page');
let currentPage = 1;
let totalPages;
console.log(currentPage);
let  rowsPerPage = 3;
console.log(rowsPerPage);
function handleSubmit(event){
   event.preventDefault();
    const amount=event.target.expAmount.value;
    const description=event.target.expDesc.value;
    const expensecat=event.target.expcategory.value;
    const obj={Amount:amount,Description:description,ExpenseCategory:expensecat}
    console.log(obj);
axios
.post('http://localhost:3000/expense/add-expense',obj,
{headers:{"Authorization":token}})
.then(response=>{console.log(response);
     console.log("response of post");
     console.log('currentPage');
     console.log(currentPage);
    fetchExpenses(currentPage); })
.catch(err=>{console.log(err)});
    //clear input fields
    document.getElementById('expAmount').value="";
    document.getElementById('expDesc').value="";
    document.getElementById('expcategory').value="";
}

function showExpenseDetails(expense,currentPage,totalPages){
    console.log('in show expense details');
    const dltbtn=document.createElement('button');
    dltbtn.className="delete";
    dltbtn.textContent="X";
    const table=document.getElementById('expenseTable');
     const tbody=table.getElementsByTagName('tbody')[0];
    const row = document.createElement('tr');
      row.innerHTML = `
               <td>${expense.Amount}</td>
               <td>${expense.Description}</td>
               <td>${expense.Category}</td>
                 `;
      const deleteCell = document.createElement('td');
       deleteCell.appendChild(dltbtn)
       row.appendChild(deleteCell);
       tbody.appendChild(row);
    dltbtn.addEventListener('click',(eventclick)=>{ 
       console.log('in delete event listener');
        console.log(eventclick.target.parentElement.parentElement);
        DeleteExpense(eventclick,expense)
    }); 
    //fetchExpenses(currentPage);
   }
function  showPremiumuserMessage(){
document.getElementById('rzp-button1').remove();
document.getElementById('membership').innerHTML="You are a Premium-User";
 showLeaderBoard();
}
function parseJwt (token) {
var base64Url = token.split('.')[1];
var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
}).join(''));

return JSON.parse(jsonPayload);
}
window.addEventListener('DOMContentLoaded',()=>{
 console.log("window content loader");
 const rowsPerPage=localStorage.getItem('rowsPerPage')||3;
const decodeToken=parseJwt(token);
if(decodeToken.isPremiumuser){
    showPremiumuserMessage();
    showAllDownloadedFiles();
}
fetchExpenses(currentPage);
});
function DeleteExpense(eventclick,expense){
console.log('in remove expense foll is expense obj');
axios.delete(`http://localhost:3000/expense/delete-expenses/${expense.id}`, {headers:{
        "Authorization":token
},data:expense
    })
.then(response=>{
    const tr=eventclick.target.parentElement.parentElement
    removeExpenseFromScreen(tr);
     fetchExpenses(1);
  }).catch(err=>showError(err));
}
//remove expense from screen
function removeExpenseFromScreen(tr){
tr.parentNode.removeChild(tr); 

}
//show error on page
function showError(err){
document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}
//show premium user message on page
function suggestPremiumMembership(){
const Message="You are not a premium user to Download file you should buy premium Membership "
document.body.innerHTML += `<div style="color:red;"> ${Message}</div>`
}
//show downloaded files on page
function  showAllDownloadedFiles(){
console.log('in showallDowloaded files')
axios.get("http://localhost:3000/expense/getfiles", { headers: {"Authorization" : token}})
.then(response=>{
    for(var i=0;i<response.data.filesData.length;i++){
        const onDate=response.data.filesData[i].createdAt.split("T");
             console.log(onDate);

            const filesDiv=document.getElementById('files');
            filesDiv.innerHTML+=`<div><a href="${response.data.filesData[i].url}">file Downloaded on ${onDate[0]}</a></div>`
    }
}).catch(err=>{
    console.log(err);
})
}


//to download files
function download(){
const decodeToken=parseJwt(token);
console.log(decodeToken);
if(!decodeToken.isPremiumuser){
    suggestPremiumMembership();
}
else{
     console.log('I am not working');
// axios.get('http://localhost:3000/expense/download', { headers: {"Authorization" : token} })
// .then((response) => {
// if(response.status === 201){
//     // the backend is essentially sending a download link
//     //  which if we open in browser, the file would download
//     var a = document.createElement("a");
//     a.href = response.data.fileURl.Location;
//     a.download = 'myexpense.csv';
//     a.click();
// } else {
//     throw new Error(response.data.message);
// }

// })
// .catch((err) => {
// showError(err)
// });
}
}
document.getElementById("rzp-button1")
.onclick=async function (e){

const response=await axios.get('http://localhost:3000/purchase/premiummembership',
{
headers:{"Authorization":token}
});
console.log(response);
var options={"key":response.data.key_id,
        "order_id":response.data.order.id,
         "handler":async function(response){
             await axios.post("http://localhost:3000/purchase/updateTransactionStatus",{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,
             },{
                headers:{"Authorization":token}
             })
             alert("you are premium user now");
             showPremiumuserMessage();
            }
    };
    const rzp1=new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    rzp1.on("payment.failed",function(response){
        console.log(response);
        alert("something went wrong");
    });

}
function showLeaderBoard(){
document.getElementById('leaderboard').innerHTML="";
const inputElement=document.createElement("input");
inputElement.type="button";
inputElement.value='show LeaderBoard';
inputElement.id="leaderBoardButton";
inputElement.onclick=async ()=>{
 
    const userLeaderBoardArray= await axios.get("http://localhost:3000/premium/showLeaderBoard",{
        headers:{
            "Authorization":token
        }
    })
    console.log(userLeaderBoardArray);
    var leaderboardElem=document.getElementById("leaderboard");
    leaderboardElem.innerHTML="";
    leaderboardElem.innerHTML+=`<h3>LeaderBoard<h3>`;
        userLeaderBoardArray.data.forEach((userDetails) => {
            leaderboardElem.innerHTML+=`<li>Name-${userDetails.Name} Total Expenses-${userDetails.total_Expenses||0}`;
        });
    
    }
    document.getElementById('membership').appendChild(inputElement);
}
nextButton.addEventListener('click', () => {
console.log('before',currentPage);
currentPage += 1;
fetchExpenses(currentPage);
});

prevButton.addEventListener('click', () => {
console.log('before',currentPage);
currentPage -= 1;
fetchExpenses(currentPage);
});

rowsPerPageOption.addEventListener('change', () => {
rowsPerPage = parseInt(rowsPerPageOption.value);
localStorage.setItem('rowsPerPage', rowsPerPage);
fetchExpenses(currentPage);
})

// Function to fetch expenses for a specific page
function fetchExpenses(page) {
const token = localStorage.getItem('token');
axios.get(`http://localhost:3000/expense/get-expense?page=${page}&limit=${rowsPerPage}`, {
    headers: { Authorization: token },
})
.then((response) => {
    const trElements = document.querySelectorAll('tbody tr');
    for (let i = trElements.length - 1; i >= 0; i--) {
     removeExpenseFromScreen(trElements[i]); 
    }
    const totalPages = response.data.totalPages;
    currentPage = response.data.currentPage;
    for(var i=0;i<response.data.allExpense.length;i++){
        showExpenseDetails(response.data.allExpense[i],  currentPage ,totalPages)
    }
    if (currentPage === 1) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    if (currentPage === totalPages) {
        nextButton.disabled = true;
        rowsPerPageOption.disabled = true;
    } else {
        nextButton.disabled = false;
        rowsPerPageOption.disabled = false;
    }
    const pageNum = document.getElementById('page-num');
    pageNum.textContent = `Page ${currentPage} of ${totalPages}`;
 })
.catch((error) => console.log(error));
}