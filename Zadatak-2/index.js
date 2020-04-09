var GAMES = {};
const NEW_ITEM = document.querySelector(".content-item");
const table = document.querySelector(".main-table");
const loadMoreButton = document.querySelector("#load-more");
var pointer = 3;

(function getGames(){
    fetch('games.json')
    
    .then(response => {
        if(response.ok){
            return response.json()
        }else{
            throw new Error("Nesto nije u redu");
        }
    })

    .then(responseObj => {
        GAMES = responseObj;
        let tableFirst = table.firstElementChild;
        tableFirst.removeChild(tableFirst.lastElementChild);
        const searchButton = document.querySelector("#search");
        searchButton.addEventListener("click", searchItems);
        loadMoreButton.addEventListener("click", loadMoreItems);
        populateList(GAMES);
    })
})()

function populateList(obj){
        obj.data.forEach(a => {
            let item = makeNewTableItem(a);
            table.appendChild(item);
        })
        const allItems = document.querySelectorAll(".content-item");
        [...allItems].forEach(item =>{
            item.children[1].firstElementChild.addEventListener("click", openURL);
            item.children[1].firstElementChild.setAttribute("title",item.children[0].textContent);
        })
        if(obj.data.length > 3){
            loadMoreButton.style.display = "block";
            for(let i=3;i<obj.data.length;i++){
                [...allItems][i].style.display = "none";
            }
        }else{
            loadMoreButton.style.display = "none";
        }
        pointer = 3;
}


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

function openURL(){
    GAMES.data.forEach(game => {
        if(this.title === game.title){
            window.open(game.url)
        }
    });
}

function deleteItem(e){
    const currentTable = document.querySelector(".main-table");
    currentTable.removeChild(this.parentNode.parentNode);
}

function searchItems(e){
    
    let textValue = document.querySelector("#search-text").value.toLowerCase();
    let radioValue = getRadioValue("name-or-genre");
    let rating = document.querySelector("#selection");
    rating = rating.options[rating.selectedIndex].text;
    if(rating === "Ocjena"){
        rating = 1;
    }
    let newObj = GAMES.data.filter(item => {
    if(radioValue === 'name'){
        if(item.title.toLowerCase().startsWith(textValue) && item.rating > parseFloat(rating)){
            return item;
        }
    }else if(radioValue === 'genre'){
        let genres = item.genre.split(",");
        genres = genres.filter(genre => {
            if(genre.toLowerCase().startsWith(textValue) && item.rating > parseFloat(rating)){
                return genre;
            }
        })
        if(genres.length > 0){
            return item;
        }
        
        
    }
    })
    table.innerHTML = `<tr>
    <th>Number</th>
    <th>Image</th>
    <th>Release date</th>
    <th>Publisher</th>
    <th>Genre</th>
    <th>Rating</th>
    <th></th>
    </tr>`;
    populateList({data:newObj});
}

function loadMoreItems(e){
    const allItems = document.querySelectorAll(".content-item");
    if(pointer+3 >= allItems.length){
        loadMoreButton.style.display = "none";   
    }
    for(i=pointer;i < pointer+3 || i === allItems.length;i++){
        [...allItems][i].style.display = "table-row";
    }
    pointer +=3;
}

