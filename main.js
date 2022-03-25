
/* Array For Global Access Users data*/
var usersDataArr = [];
async function fetchDataFun() {
    const fetchedData = await fetch('https://run.mocky.io/v3/010e898c-a05c-4a0a-b947-2a65b5a267c5')
    return fetchedData.json();
}

/*Function to resolve or reject promise*/
fetchDataFun().then(apiData => {
    var defaultIndex = 0;
    //console.log(apiData);
    apiData.map((objs)=>{usersDataArr.push(objs);});
    
    //console.log(usersDataArr);
    displayDataOnLeft(usersDataArr);
    readDataOnClick(defaultIndex);
}).catch((error)=>{
    //console.log("Data couldn't be fetched!!!");
});


/*Function to take data from Array & display in left table */
function displayDataOnLeft(usersDataArr) {
    //console.log(usersDataArr);
    //console.log('in display data fun');
    var rowData = '';
    for(let idx=0; idx < usersDataArr.length; idx++) {
            rowData+="<tr onClick=readDataOnClick("+idx+")>";
            rowData+="<td>"+usersDataArr[idx].first_name+"</td>";
            rowData+="<td>"+usersDataArr[idx].last_name+"</td>";
            rowData+="<td>"+usersDataArr[idx].username+"</td>";
            rowData+="<td>"+usersDataArr[idx].employment.title+"</td>";
            rowData+="<td>"+usersDataArr[idx].address.country+"</td>";
            rowData+="<td onClick=deleteUsersData("+idx+")><i class='fa fa-trash-o' style='font-size:40px;color:red;cursor:pointer'></i></td>"
            rowData+="</tr>";
    }
    //console.log(rowData);
    document.getElementById("myTable").innerHTML = rowData;
}



/*Function to display in right view on click on row*/
function readDataOnClick(index) {
    let data1="";
        for(let i=0;i<usersDataArr.length;i++){
            if(i==index){
            showGreetMsg(usersDataArr[i].first_name);

            data1=`
            <img src=${usersDataArr[i].avatar}</img>

            <dl>
                <dt>ID :</dt>
                <dd>${usersDataArr[i].id}</dd>
                <dt>UID :</dt>
                <dd>${usersDataArr[i].uid}</dd>
                <dt>Password :</dt>
                <dd>${usersDataArr[i].password}</dd>
                <dt>DOB :</dt>
                <dd>${usersDataArr[i].date_of_birth}</dd>
                <dt>Full Name :</dt>
                <dd>${usersDataArr[i].first_name+" "+usersDataArr[i].last_name}</dd>
                <dt>UserName :</dt>
                <dd>${usersDataArr[i].username}</dd>
                <dt>Email :</dt>
                <dd>${usersDataArr[i].email}</dd>
                <dt>Title :</dt>
                <dd>${usersDataArr[i].employment.title}</dd>
                <dt>Address:</dt>
                <dd>${usersDataArr[i].address.city + "," + usersDataArr[i].address.state
            +","+usersDataArr[i].address.country}</dd>
                <dt>Card Number :</dt>
                <dd>${usersDataArr[i].credit_card.cc_number}</dd>
                <dt>Staus :</dt>
                <dd>${usersDataArr[i].subscription.status}</dd>
            </dl>
          `;
          }
          
        }
        document.getElementById("display-data").innerHTML=data1;
    
}

/*Function to show greetings to the users*/
const showGreetMsg =(firstName)=>{
    const time = new Date();
    let msg = '';
    let currTime = time.getHours();
    if(currTime < 12) {
        msg = `Good Morning ${firstName}...`;
    }
   else if(currTime >= 12 && currTime <= 17){
        msg = `Good Afternoon ${firstName}...`;
    } else {
        msg = `Good Evening ${firstName}...`;
    }

    document.getElementById("greet-msg").innerHTML = msg;

}

/*Function to delete users data*/
const deleteUsersData = (index) => {
    for(let i=0;i<usersDataArr.length;i++){
        if(index===i){
            usersDataArr.splice(i,1);
            displayDataOnLeft(usersDataArr);

        }
    }
}