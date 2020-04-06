let itemsObj = {
    income:[],
    expenses:[]
}

if(!localStorage.getItem('items')){
    localStorage.setItem('items' , '');
    updateMonth()
}else{
    displayItems();
    updateBudget();
    updatePercentage();
    updateMonth()
}
function updateMonth(){
    let datum = new Date;
    const month = datum.toLocaleString('default', { month: 'long' });
    const monthSpan = document.querySelector(".month");
    monthSpan.textContent = month;
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
    let numberValue = document.querySelector("#input-value").value;
    numberValue = parseFloat(numberValue).toFixed(2);
    const newItem = createListItem(descriptionValue,parseFloat(numberValue).toFixed(2),selectionValue);
    if(selectionValue === '+'){
        const list = document.querySelector(".income .content-list");
        list.appendChild(newItem);
        itemsObj.income.push({description : descriptionValue ,value : numberValue});
        updateLocalStorage();
        updateBudget()
        updatePercentage();
    }else{
        const list = document.querySelector(".expenses .content-list");
        list.appendChild(newItem);
        itemsObj.expenses.push({description : descriptionValue ,value : numberValue});
        updateLocalStorage();
        updateBudget()
        updatePercentage();
    }

}

function createListItem(description,value,selection){
    let newItem = document.createElement("li")
    let newSpanLeft = document.createElement("span");
    let newSpanRight = document.createElement("span");
    let percentageBox = document.createElement("div");
    let deleteButton = document.createElement("div");
    deleteButton.addEventListener("click", deleteItem);

    newItem.classList.add("content-item");
    newSpanLeft.classList.add("span-left");
    newSpanRight.classList.add("span-right");
    percentageBox.classList.add("percentage" ,"positioned");
    deleteButton.classList.add("x-button");

    newSpanLeft.textContent = description;
    newSpanRight.textContent = value;
    if(selection === '-'){
        percentageBox.textContent = "?";
    }
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
    incAndExp[1].innerHTML = expenses.toFixed(2) + ' <span class="percentage"></span>';
    const budget = document.querySelector(".budget");
    budget.textContent =(income - expenses).toFixed(2);
    if(parseFloat(budget.textContent) > 0){
        budget.textContent = "+" + (income - expenses).toFixed(2);
    }

}

const deleteButtons = document.querySelectorAll(".x-button");
[...deleteButtons].forEach(button => button.addEventListener("click", deleteItem));

function deleteItem(e){
    
    let itemName = this.parentNode.firstElementChild.textContent.toLowerCase();
    let targeted = this.parentNode.parentNode.parentNode.firstElementChild.textContent.toLowerCase();
    if(targeted === Object.keys(itemsObj)[0]) {
        itemsObj.income = itemsObj.income.filter(item => item.description.toLowerCase() !== itemName);
        this.parentNode.parentNode.removeChild(this.parentNode);
        updateLocalStorage();
        updateBudget();  
        updatePercentage();
    }else if(targeted === Object.keys(itemsObj)[1]){
        itemsObj.expenses = itemsObj.expenses.filter(item => item.description.toLowerCase() !== itemName);
        this.parentNode.parentNode.removeChild(this.parentNode);
        updateLocalStorage();
        updateBudget();
        updatePercentage();
    }
   
}

function updatePercentage(){
    const percentageBoxes = document.querySelectorAll(".expenses >.content-list > .content-item > .percentage");
    const incomeNumber = document.querySelector("#income-number");
    const expensesPerc = document.querySelector("#expenses-number > .percentage");
    let num = parseFloat(incomeNumber.textContent);
    let perc = parseFloat(num/100);
    let sumOfPerc = 0;
    [...percentageBoxes].forEach(box => {
        box.textContent = parseInt((parseFloat(box.previousSibling.textContent) / perc)) + '%';
        sumOfPerc += parseInt(parseFloat(box.previousSibling.textContent) / perc);
    })
    expensesPerc.textContent = sumOfPerc + '%';
    
}



