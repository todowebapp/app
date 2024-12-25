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

const LOCAL_STORAGE_TO_DO_LISTS_KEY = "toDoLists";
const LOCAL_STORAGE_CURRENT_TO_DO_LIST_KEY = "currentToDoList";


function renderToDoListRef(toDoList) {
    const sideBarListRefsItem = sideBarListRefsItemTemplate.content.cloneNode(true).querySelector(".sideBar-listRefs-item");
    
    sideBarListRefsItem.innerText = toDoList.name;
    sideBarListRefsItem.addEventListener("click", function() {
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
        entry.completed = event.target.checked;
    });
    
    entryTextDiv.innerText = entry.text;
    entryTextDiv.addEventListener("input", function(event) {
        entry.text = event.target.innerText;
    });
    
    toDoListWinEntries.appendChild(entryDiv);
    return entryDiv;
}


function renderToDoList(toDoList) {
    // clear
    toDoListWinEntries.innerHTML = "";
    
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


function saveToDoLists(toDoLists) {
    const toDoListsStr = JSON.stringify(toDoLists);
    localStorage.setItem(LOCAL_STORAGE_TO_DO_LISTS_KEY, toDoListsStr);
}


function loadToDoLists() {
    const toDoListsStr = localStorage.getItem(LOCAL_STORAGE_TO_DO_LISTS_KEY);
    return toDoListsStr === null ? [] : JSON.parse(toDoListsStr);
}


function saveCurrentToDoList(currentToDoList) {
    const currentToDoListStr = JSON.stringify(currentToDoList);
    localStorage.setItem(LOCAL_STORAGE_CURRENT_TO_DO_LIST_KEY, currentToDoListStr);
}


function loadCurrentToDoList() {
    const currentToDoListStr = localStorage.getItem(LOCAL_STORAGE_CURRENT_TO_DO_LIST_KEY);
    return currentToDoListStr === null ? null : JSON.parse(currentToDoListStr);
}


function main() {
    // vars
    let toDoLists = loadToDoLists();
    let currentToDoList = loadCurrentToDoList();
    
    // add event listeners
    
    window.addEventListener("beforeunload", function() {
        saveToDoLists(toDoLists);
        saveCurrentToDoList(currentToDoList);
    });
    sideBarNewListBtn.addEventListener("click", showListCreationWin);
    toDoListWinNewEntryBtn.addEventListener("click", function() {
        if (!currentToDoList) return;
        
        const newEntry = currentToDoList.createEntry("");
        const entryDiv = renderEntry(newEntry);
        entryDiv.focus();
    });
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
    
    // main code
    if (currentToDoList !== null) {
        renderToDoList(currentToDoList);
    }
}