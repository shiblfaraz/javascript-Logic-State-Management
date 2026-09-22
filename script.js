// Get elements from the DOM

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const emptyMessage = document.getElementById("empty-message");
const taskCount = document.getElementById("task-count");

const filterButtons = document.querySelectorAll(".filter-btn");
const clearCompletedButton = document.getElementById("clear-completed");


// Application state

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let currentFilter = "all";


// Save todos to localStorage

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}


// Create a new task

function addTodo(text) {

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTodo);

    saveTodos();

    renderTodos();
}


// Display tasks

function renderTodos() {

    todoList.innerHTML = "";

    let filteredTodos = todos;

    // Apply filter

    if (currentFilter === "active") {

        filteredTodos = todos.filter(todo => !todo.completed);

    } else if (currentFilter === "completed") {

        filteredTodos = todos.filter(todo => todo.completed);

    }


    // Show empty message

    if (filteredTodos.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";
    }


    // Create task elements

    filteredTodos.forEach(todo => {

        const li = document.createElement("li");

        li.className = "todo-item";

        if (todo.completed) {
            li.classList.add("completed");
        }

        li.dataset.id = todo.id;


        li.innerHTML = `
            <input
                type="checkbox"
                class="todo-checkbox"
                ${todo.completed ? "checked" : ""}
                aria-label="Mark task as completed"
            >

            <span class="todo-text">
                ${escapeHTML(todo.text)}
            </span>

            <div class="todo-actions">

                <button
                    class="edit-btn"
                    data-action="edit"
                    type="button">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    data-action="delete"
                    type="button">
                    Delete
                </button>

            </div>
        `;

        todoList.appendChild(li);
    });


    updateTaskCount();
}


// Prevent HTML injection

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// Update remaining task count

function updateTaskCount() {

    const remainingTasks =
        todos.filter(todo => !todo.completed).length;

    taskCount.textContent =
        `${remainingTasks} ${remainingTasks === 1 ? "task" : "tasks"} remaining`;
}


// Add task

todoForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const text = todoInput.value.trim();

    if (text === "") {
        return;
    }

    addTodo(text);

    todoInput.value = "";

    todoInput.focus();
});


// Event delegation

todoList.addEventListener("click", function(event) {

    const todoItem = event.target.closest(".todo-item");

    if (!todoItem) {
        return;
    }

    const todoId = Number(todoItem.dataset.id);

    const todo = todos.find(todo => todo.id === todoId);

    if (!todo) {
        return;
    }


    // Delete

    if (event.target.dataset.action === "delete") {

        todos = todos.filter(todo => todo.id !== todoId);

        saveTodos();

        renderTodos();

        return;
    }


    // Edit

    if (event.target.dataset.action === "edit") {

        const updatedText = prompt(
            "Edit your task:",
            todo.text
        );

        if (updatedText !== null) {

            const trimmedText = updatedText.trim();

            if (trimmedText !== "") {

                todo.text = trimmedText;

                saveTodos();

                renderTodos();
            }
        }
    }
});


// Complete / uncomplete task

todoList.addEventListener("change", function(event) {

    if (!event.target.classList.contains("todo-checkbox")) {
        return;
    }

    const todoItem = event.target.closest(".todo-item");

    const todoId = Number(todoItem.dataset.id);

    const todo = todos.find(todo => todo.id === todoId);

    if (!todo) {
        return;
    }

    todo.completed = event.target.checked;

    saveTodos();

    renderTodos();
});


// Filter buttons

filterButtons.forEach(button => {

    button.addEventListener("click", function() {

        currentFilter = button.dataset.filter;


        // Update active button

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        renderTodos();
    });
});


// Clear completed tasks

clearCompletedButton.addEventListener("click", function() {

    todos = todos.filter(todo => !todo.completed);

    saveTodos();

    renderTodos();
});


// Load saved tasks when page opens

renderTodos();