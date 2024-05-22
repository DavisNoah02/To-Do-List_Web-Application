// Selecting the input box and the task list elements from the HTML
let inputBox = document.querySelector('#task-input');
let inputlist = document.querySelector('#list');

// Adding event listener to the input box for the "keydown" event
// When Enter key is pressed, it calls addTask function and clears the input box value
inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
        inputBox.value = "";
    }
});

// Function to add a new task to the list
function addTask() {
    // Checking if the input box is empty
    if (inputBox.value === '') {
        alert("Write something");
    } else {
        // Creating a new list item
        let li = document.createElement("li");
        li.textContent = inputBox.value; // Setting the text content of the list item

        // Creating edit and delete buttons
        let editBtn = document.createElement("span");
        editBtn.className = "edit";
        editBtn.innerHTML = "\u270E"; // Pencil icon
        li.appendChild(editBtn);

        let deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = "\u00d7"; // "×" symbol
        li.appendChild(deleteBtn);

        // Adding event listeners to edit and delete buttons
        editBtn.addEventListener("click", function() {
            editTask(li);
        });

        deleteBtn.addEventListener("click", function() {
            li.remove();
            saveData();
        });

        // Appending the new list item to the task list
        inputlist.appendChild(li);

        // Saving the updated data to localStorage
        saveData();
    }
    // Clearing the input box after adding the task
    inputBox.value = "";
}

// Adding event listener to the task list for clicks on list items
// It toggles the "checked" class on the list item and saves the updated data
inputlist.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
}, false);

// Function to allow editing of a task
// It prompts the user to enter a new task text, updates the list item text, and saves the updated data
function editTask(li) {
    let currentText = li.firstChild.textContent;
    let newText = prompt("Edit your task", currentText);
    if (newText !== null && newText.trim() !== "") {
        li.firstChild.textContent = newText.trim();
        saveData();
    }
}

// Function to save the current state of the task list to localStorage
function saveData() {
    localStorage.setItem("data", inputlist.innerHTML);
}

// Function to retrieve the saved data from localStorage and display it in the task list
function showTask() {
    inputlist.innerHTML = localStorage.getItem("data");
}

// Initial display of tasks when the page loads
showTask();
