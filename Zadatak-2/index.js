function populateList(){
    fetch('games.json')
    
    .then(response => {
        if(response.ok){
            return response.json()
        }else{
            throw new Error("Nesto nije u redu");
        }
    })

    .then(objekat => {
        const table = document.querySelector(".main-table");
        objekat.data.forEach(a => {
            let item = makeNewTableItem(a);
            table.appendChild(item);
        })
        let tableFirst = table.firstElementChild;
        tableFirst.removeChild(tableFirst.lastElementChild);
        const searchButton = document.querySelector("#search");
        searchButton.addEventListener("click", searchItems);
        GAMES = objekat;
        console.log(GAMES)
    })
    

}
populateList();

var GAMES = {};
const NEW_ITEM = document.querySelector(".content-item");

function getRadioValue(theRadioGroup){
    var elements = document.getElementsByName(theRadioGroup);
    for (var i = 0, l = elements.length; i < l; i++){
        if (elements[i].checked){
            return elements[i].value;
        }
    }
}

function makeNewTableItem(obj){
    let newItem = NEW_ITEM.cloneNode(true);
    newItem.firstElementChild.textContent = obj.title;
    newItem.children[1].innerHTML = `<img src=${obj.img}>`;
    newItem.children[2].textContent = obj.reldate;
    newItem.children[3].textContent = obj.publisher;
    newItem.children[4].textContent = obj.genre;
    newItem.children[5].textContent = obj.rating;
    newItem.children[6].firstElementChild.addEventListener("click", deleteItem);
    return newItem;
}

function deleteItem(e){

}

function searchItems(e){
    const allItems = document.querySelectorAll(".content-item");
    let textValue = document.querySelector("#search-text").value;
    let radioValue = getRadioValue("name-or-genre");
    let rating = document.querySelector("#selection");
    rating = rating.options[rating.selectedIndex].text;
    if(rating === "Ocjena"){
        rating = 1;
    }else{
        
    }
    


}

