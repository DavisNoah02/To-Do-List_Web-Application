// Selecting the input box and the task list elements from the HTML
let inputBox = document.querySelector('#task-input');
let inputlist = document.querySelector('#list');

// enter key event listener---
inputBox.addEventListener("keydown", function (event) {
    if(event.key === "Enter"){
        addTask()
        inputBox.value = "";
    }
})

// Function to add new task to the list
function addTask(){
    if(inputBox.value === ''){ //check condition
        alert("Write something")
    }
    else{
        // create a new list item 
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        inputlist.appendChild(li);
        //  edit icon
        let editBtn = document.createElement("span");
        editBtn.className = "edit";
        editBtn.innerHTML = "\u270E"; // Pencil icon
        li.appendChild(editBtn);
        //   delete cross symbol
        let deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = "\u00d7"; // "×" symbol
        li.appendChild(deleteBtn);
        // Event listeners to edit and delete buttons
        editBtn.addEventListener("click", function() {
            editTask(li);
        });

        deleteBtn.addEventListener("click", function() {
            li.remove();
            saveData();
        });
        // 
        inputlist.appendChild(li);
    }
    inputBox.value = "";
    saveData();
}

// Function to edit the task
function editTask(li) {
    let currentText = li.firstChild.textContent;
    let newText = prompt("Edit your task", currentText);
    if (newText !== null && newText.trim() !== "") {
        li.firstChild.textContent = newText.trim();
        saveData();
    }
}

inputlist.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    // else if(e.target.tagName === "SPAN"){
    //     e.target.parentElement.remove();
    //     saveData();
    // }
}, false);

// saves the current state of the task list to localStorage
function saveData(){
    localStorage.setItem("data",inputlist.innerHTML);
}
// retrieves the saved data from localStorage and display it in the task list
function showTask(){
    inputlist.innerHTML = localStorage.getItem("data")
}
showTask();  //displays task when page loads