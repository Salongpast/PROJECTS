const button = document.querySelector(".submit-button");
const input = document.querySelector(".js-input");
const display = document.querySelector(".display-div");
const date = document.querySelector(".js-date-input");
let toDoList = [{name: 'NIgga',duedate: 2022}];

function setList() {
     let inputValue = input.value;
     let inputDate = date.value;
     toDoList.push({name: inputValue, duedate: inputDate});

     console.log(toDoList);
     renderList();
     console.log(toDoList);
}
function renderList(){
     let html = "";
     for(let i = 0; i < toDoList.length; i++){
          html += `
          <div class="name">${toDoList[i].name}</div> 
          <div class="duedate">${toDoList[i].duedate} </div>
          <button class="delete-button"onclick=" 
          toDoList.splice(${i}, 1); 
          renderList(); ">Delete</button>
          `;
     }
     display.innerHTML = html;
     
}
renderList();

