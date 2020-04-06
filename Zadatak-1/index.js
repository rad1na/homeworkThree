let itemsObj = {
    income:[],
    expenses:[]
}

if(!localStorage.getItem('items')){
    localStorage.setItem('items' , '');
}else{
    displayItems();
    updateBudget();
}

function updateLocalStorage(){
    localStorage.setItem('items',JSON.stringify(itemsObj));
}

function displayItems(){
    itemsObj = JSON.parse(localStorage.getItem('items'));
    itemsObj.income.forEach(obj => {
        const newItem = createListItem(obj.description,obj.value);
        const list = document.querySelector(".income .content-list");
        list.appendChild(newItem);
    })
    itemsObj.expenses.forEach(obj => {
        const newItem = createListItem(obj.description,obj.value);
        const list = document.querySelector(".expenses .content-list");
        list.appendChild(newItem);
    })
}

const submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click", addItem);

function addItem(e){
    const selectionValue = document.querySelector("#selection").value;
    const descriptionValue = document.querySelector("#description").value;
    const numberValue = document.querySelector("#input-value").value;
    const newItem = createListItem(descriptionValue,parseFloat(numberValue).toFixed(2));
    if(selectionValue === '+'){
        const list = document.querySelector(".income .content-list");
        list.appendChild(newItem);
        itemsObj.income.push({description : descriptionValue ,value : numberValue});
        updateLocalStorage();
        updateBudget()
    }else{
        const list = document.querySelector(".expenses .content-list");
        list.appendChild(newItem);
        itemsObj.expenses.push({description : descriptionValue ,value : numberValue});
        updateLocalStorage();
        updateBudget()
    }

}

function createListItem(description,value){
    let newItem = document.createElement("li")
    let newSpanLeft = document.createElement("span");
    let newSpanRight = document.createElement("span");
    let percentageBox = document.createElement("div");
    let deleteButton = document.createElement("div");

    newItem.classList.add("content-item");
    newSpanLeft.classList.add("span-left");
    newSpanRight.classList.add("span-right");
    percentageBox.classList.add("percentage" ,"positioned");
    deleteButton.classList.add("x-button");

    newSpanLeft.textContent = description;
    newSpanRight.textContent = value;
    percentageBox.textContent = "?";
    deleteButton.textContent = "X";

    newItem.appendChild(newSpanLeft);
    newItem.appendChild(newSpanRight);
    newItem.appendChild(percentageBox);
    newItem.appendChild(deleteButton);

    return newItem;
    
}

function updateBudget(){
    const incAndExp = document.querySelectorAll(".box-number");
    let income = 0,expenses=0;
    itemsObj.income.forEach(item => income += parseFloat(item.value));
    itemsObj.expenses.forEach(item => expenses += parseFloat(item.value));
    incAndExp[0].textContent = income.toFixed(2);
    incAndExp[1].textContent = expenses.toFixed(2);
    const budget = document.querySelector(".budget");
    budget.textContent =(income - expenses).toFixed(2);

}

const deleteButtons = document.querySelectorAll(".x-button");
[...deleteButtons].forEach(button => button.addEventListener("click", deleteItem));

function deleteItem(e){
    let itemName = this.parentNode.firstElementChild.textContent.toLowerCase();
    console.log(itemName);
    console.log();
    //this.parentNode.parentNode.removeChild(this.parentNode);
}

