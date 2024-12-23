class Entry
{
    constructor(text, completed = false) {
        this.text = text;
        this.completed = completed;
    }
    
    setCompleted(completed) {
        this.completed = completed;
    }
    
    toggleCompleted() {
        this.completed = !this.completed;
    }
};


class ToDoList
{
    constructor(name) {
        this.name = name;
        this.entries = [];
    }
    
    addEntry(entry) {
        this.entries.push(entry);
    }
    
    createEntry(text) {
        let entry = new Entry(text);
        this.entries.push(entry);
    }
};


function storeToDoLists(toDoLists) {
    
}

function loadToDoLists() {
    
}


/////////

/*

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To Do</title>
    <link rel="stylesheet" href="style.css">
</head>
<body onload="onLoad()">
    <div id="header">
        <h1>To Do</h1>
    </div>
    <div id="sideBar">
        <h2>Listen</h2>
        <button id="sideBar-newListBtn">Neue Liste</button>
        <ul id="sideBar-lists">
            <!-- to do lists here -->
        </ul>
    </div>
    <div id="canvas">
        <!-- empty at start -->
    </div>
    
    <div id="listCreationWin" class="hidden">
        <h2 id="listCreationWin-title">Neue Liste hinzufügen</h2>
        <input id="listCreationWin-nameTxtField" type="text" placeholder="Name">
        <div id="listCreationWin-buttons">
            <button id="listCreationWin-cancelBtn">Abbrechen</button>
            <button id="listCreationWin-addBtn">Hinzufügen</button>
        </div>
    </div>
    
    
    <script src="script.js"></script>
</body>
</html>
*/


// elements

const sideBarNewListBtn = document.getElementById("sideBar-newListBtn");
const sideBarListRefs = document.getElementById("sideBar-listRefs");
const canvas = document.getElementById("canvas");
const toDoListWin = document.getElementById("toDoListWin");
const toDoListWinEmptyEntry = document.getElementById("toDoListWin-emptyEntry");
const toDoListWinEmptyEntryTxtFile = toDoListWinEmptyEntry.querySelector(".toDoListWin-entry-text");
const listCreationWin = document.getElementById("listCreationWin");
const listCreationWinNameTxtField = document.getElementById("listCreationWin-nameTxtField");
const listCreationWinCancelBtn = document.getElementById("listCreationWin-cancelBtn");
const listCreationWinAddBtn = document.getElementById("listCreationWin-addBtn");
const toDoListWinEntryTemplate = document.getElementById("toDoListWin-entry-template");


// vars

let toDoLists = [];
let currentToDoList = new ToDoList("Hello");

// functions

function showListCreationWin() {
    listCreationWinNameTxtField.value = "";
    listCreationWin.classList.remove("hidden");
}


function hideListCreationWin() {
    listCreationWin.classList.add("hidden");
}


function appendToDoListRefToSideBar(listName) {
    const listItem = document.createElement("li");
    listItem.innerText = listName;
    sideBarListRefs.appendChild(listItem);
}


function appendNewToDoList(listName) {
    const toDoList = new ToDoList(listName);
    toDoLists.push(toDoList);
    appendToDoListRefToSideBar(listName);
    hideListCreationWin();
}


function handleToDoListEmptyEntryKeyPress(event) {
    if (event.key != "Enter") {
        return;
    }
    
    if (currentToDoList === null) {
        // just in case
        return;
    }
    
    const text = toDoListWinEmptyEntryTxtFile.value;
    
    if (text == "") {
        return;
    }
    
    toDoListWinEmptyEntryTxtFile.value = "";
    
    const toDoListWinEntry = toDoListWinEntryTemplate.content.cloneNode(true);
    const lastChild = toDoListWin.lastChild;
    
    toDoListWinEntry.querySelector(".toDoListWin-entry-text").value = text;
    toDoListWin.insertBefore(toDoListWinEntry, lastChild);
}

function onLoad() {
    console.log("On Load");
}


// add events

sideBarNewListBtn.addEventListener("click", showListCreationWin);
toDoListWinEmptyEntryTxtFile.addEventListener("keydown", handleToDoListEmptyEntryKeyPress);
listCreationWinCancelBtn.addEventListener("click", hideListCreationWin);
listCreationWinAddBtn.addEventListener("click", function() {
    const listName = listCreationWinNameTxtField.value;
    
    if (listName === "") {
        alert("Es wurde kein Name angegben!");
        return;
    }
    
    appendNewToDoList(listName);
});