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
    
    createEntry(text, completed = false) {
        const entry = new Entry(text, completed);
        this.entries.push(entry);
        return entry;
    }
};


const sideBarNewListBtn = document.getElementById("sideBar-newListBtn");
const sideBarListRefs = document.getElementById("sideBar-listRefs");
const toDoListWin = document.getElementById("toDoListWin");
const toDoListWinListName = document.getElementById("toDoListWin-listName");
const toDoListWinEntries = document.getElementById("toDoListWin-entries");
const toDoListWinNewEntryBtn = document.getElementById("toDoListWin-newEntryBtn");
const listCreationWin = document.getElementById("listCreationWin");
const listCreationWinNameTxtField = document.getElementById("listCreationWin-nameTxtField");
const listCreationWinCancelBtn = document.getElementById("listCreationWin-cancelBtn");
const listCreationWinAddBtn = document.getElementById("listCreationWin-addBtn");
const sideBarListRefsItemTemplate = document.getElementById("sideBar-listRefs-item-template");
const toDoListWinEntryTemplate = document.getElementById("toDoListWin-entry-template");


function renderToDoListRef(toDoList) {
    const sideBarListRefsItem = sideBarListRefsItemTemplate.content.cloneNode(true).querySelector(".sideBar-listRefs-item");
    
    sideBarListRefsItem.innerText = toDoList.name;
    sideBarListRefsItem.addEventListener("click", function() {
        console.log("Rendering List: ", toDoList);
        renderToDoList(toDoList);
    });
    
    sideBarListRefs.appendChild(sideBarListRefsItem);
}


function renderEntry(entry) {
    const entryDiv = toDoListWinEntryTemplate.content.cloneNode(true).querySelector(".toDoListWin-entry");
    const entryCheckbox = entryDiv.querySelector(".toDoListWin-entry-checkbox");
    const entryTextDiv = entryDiv.querySelector(".toDoListWin-entry-text");
    
    entryCheckbox.checked = entry.completed;
    entryCheckbox.addEventListener("change", function(event) {
        console.log("Changed: ", entry);
        entry.completed = event.target.checked;
    });
    
    entryTextDiv.innerText = entry.text;
    entryTextDiv.addEventListener("input", function(event) {
        console.log("Input: ", entry);
        entry.text = event.target.innerText;
    });
    
    toDoListWinEntries.appendChild(entryDiv);
    return entryDiv;
}


function renderToDoList(toDoList) {
    // clear
    toDoListWinEntries.innerHTML = "";
    console.log(toDoList);
    // render list name
    toDoListWinListName.innerText = toDoList.name;
    
    // render entries
    for (let i = 0; i < toDoList.entries.length; i++) {
        const entry = toDoList.entries[i];
        renderEntry(entry);
    }
    
    // show
    toDoListWin.style.display = "flex";
}

function hideToDoListWin() {
    toDoListWin.style.display = "none";
}


function showListCreationWin() {
    listCreationWinNameTxtField.value = "";
    listCreationWin.hidden = false;
}


function hideListCreationWin() {
    listCreationWin.hidden = true;
}


function createToDoList(listName, toDoLists) {
    const toDoList = new ToDoList(listName);
    
    toDoLists.push(toDoList);
    renderToDoListRef(toDoList);
    
    return toDoList;
}


function main() {
    console.log("main");
    
    let toDoLists = [];
    let currentToDoList = null;
    
    sideBarNewListBtn.addEventListener("click", showListCreationWin);
    toDoListWinNewEntryBtn.addEventListener("click", function() {
        if (!currentToDoList) return;
        
        const newEntry = currentToDoList.createEntry("");
        const entryDiv = renderEntry(newEntry);
        entryDiv.focus();
    })
    listCreationWinCancelBtn.addEventListener("click", hideListCreationWin);
    listCreationWinAddBtn.addEventListener("click", function() {
        const newToDoListName = listCreationWinNameTxtField.value;
        
        if (newToDoListName === "") {
            return;
        }
        
        currentToDoList = createToDoList(newToDoListName, toDoLists);
        hideListCreationWin();
        renderToDoList(currentToDoList);
    });
}