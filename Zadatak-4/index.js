var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
const checkBoxes = document.querySelectorAll(".checkbox");
const saveProfile = document.querySelector("#save-profile");


form.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
saveProfile.addEventListener("click", saveChanges);

(function (){
  if(localStorage.getItem("userProfileURL")){
    let itemsURL = localStorage.getItem("userProfileURL");
    fetch(itemsURL,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        createItem(item.title,item.done);
      })
    })
  }
})()

function addItem(e) {
  e.preventDefault();
  var newItem = document.getElementById("item").value;
  if(newItem.length < 3){
    alert("You have to input 3 or more characters");
  }else{
    createItem(newItem);
  }
}

function createItem(title,checked){
  var li = document.createElement("li");
  li.className = "list-group-item";
  li.appendChild(document.createTextNode(title));
  var deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm float-right delete";
  var checkBox = document.createElement("input");
  checkBox.classList.add("checkbox")
  checkBox.setAttribute("type","checkbox");
  checkBox.addEventListener("click", handleCheckClick);
  deleteBtn.appendChild(document.createTextNode("X"));
  li.appendChild(deleteBtn);
  if(checked){
    if(checked === true){
    checkBox.checked = "true";
    li.style.textDecoration = "line-through";
    }else
    checkBox.checked = "false";
  }
  li.appendChild(checkBox);
  itemList.appendChild(li);
}

function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure?")) {
      var li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
}

function handleCheckClick(e){
    if(this.checked){
      this.parentNode.style.textDecoration = "line-through";
    }else{
      this.parentNode.style.textDecoration = "none";
    }
}

function saveChanges(){
  let tasks = [];
  const allItems = document.querySelectorAll(".list-group-item");
  if(allItems.length === 0){
    alert("Nothing to save");
  }else{
    [...allItems].forEach(item => {
      let textValue = item.firstChild.textContent;
      let checkedValue = item.lastElementChild.checked;
      tasks.push({
        "title" : textValue,
        "done" : checkedValue
      })
    })
    fetch('https://jsonblob.com/api/jsonBlob', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tasks)
    })
    .then(response => {
      return response.headers.get('Location');
    })
    .then(data => {
      localStorage.setItem("userProfileURL",data);
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  }
  
  
}
