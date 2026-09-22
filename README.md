# 📝 To-Do List Application

A responsive and interactive client-side To-Do List application developed using **HTML5, CSS3, and JavaScript** as part of my **Thiranx Web Development Internship – Task 3**.

The project demonstrates DOM manipulation, event handling, CRUD operations, state management, filtering, and browser-based data persistence using `localStorage`.

## 🚀 Features

* ✅ Create new tasks
* 📖 Display and manage existing tasks
* ✏️ Edit tasks
* 🗑️ Delete tasks
* ☑️ Mark tasks as completed
* 🔍 Filter tasks:

  * All
  * Active
  * Completed
* 🧹 Clear all completed tasks
* 💾 Automatically saves tasks using `localStorage`
* 🔄 Tasks remain available after refreshing the browser
* 📱 Responsive design for desktop and mobile devices
* ♿ Basic accessibility support with ARIA labels

## 🛠️ Technologies Used

* **HTML5** – Semantic structure and form elements
* **CSS3** – Styling, layout, responsiveness, and UI design
* **JavaScript** – Application logic, DOM manipulation, event handling, and state management
* **LocalStorage API** – Persistent storage of tasks

## 📂 Project Structure

```text
thiranx-todo-list/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## ⚙️ How It Works

### 1. Adding a Task

Users can enter a task in the input field and click **Add Task**.

Each task is stored as an object containing:

```javascript
{
    id: Date.now(),
    text: "Task name",
    completed: false
}
```

### 2. Updating a Task

Users can:

* Edit the task text.
* Mark a task as completed or active.

### 3. Deleting a Task

Clicking the **Delete** button removes the selected task from the application state.

### 4. Filtering Tasks

The application supports three filters:

```text
All → Displays all tasks
Active → Displays incomplete tasks
Completed → Displays completed tasks
```

### 5. Local Storage

Tasks are automatically saved using the browser's `localStorage`.

```javascript
localStorage.setItem("todos", JSON.stringify(todos));
```

When the application loads, the saved data is retrieved:

```javascript
JSON.parse(localStorage.getItem("todos"))
```

This allows tasks to remain available after refreshing or reopening the page in the same browser.

## 🧠 JavaScript Concepts Demonstrated

This project demonstrates:

* Variables and arrays
* Objects
* Functions
* Array
