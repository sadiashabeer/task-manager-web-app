const API_URL = "/tasks";

window.onload = loadTasks;

// Load all tasks
tasks.forEach(task => {
    const li = document.createElement("li");

    if (task.completed) {
        li.classList.add("completed");
    }

    const safeTitle = JSON.stringify(task.title);

    li.innerHTML = `
        <span>${task.title}</span>
        <div class="actions">
            <button onclick='toggleTask(${task.id}, ${safeTitle}, ${task.completed})'>
                ${task.completed ? "Undo" : "Done"}
            </button>

            <button onclick='editTask(${task.id}, ${safeTitle}, ${task.completed})'>
                Edit
            </button>

            <button onclick="deleteTask(${task.id})">
                Delete
            </button>
        </div>
    `;

    taskList.appendChild(li);
});
// Add task
async function addTask() {
    const input = document.getElementById("taskInput");
    const title = input.value.trim();

    if (!title) {
        alert("Task title cannot be empty.");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
    });

    input.value = "";
    loadTasks();
}

// Edit task
async function editTask(id, oldTitle, completed) {
    const newTitle = prompt("Edit task:", oldTitle);

    if (newTitle === null) return;

    if (newTitle.trim() === "") {
        alert("Task title cannot be empty.");
        return;
    }

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: newTitle.trim(),
            completed: completed
        })
    });

    loadTasks();
}

// Complete / Undo
async function toggleTask(id, title, completed) {
    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            completed: !completed
        })
    });

    loadTasks();
}

// Delete task
async function deleteTask(id) {
    if (!confirm("Delete this task?")) return;

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}
