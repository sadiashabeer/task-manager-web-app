const API_URL = "/tasks";

window.onload = loadTasks;

async function loadTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

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
}

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

async function editTask(id, oldTitle, completed) {
    const newTitle = prompt("Edit task:", oldTitle);

    if (newTitle === null) return;

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

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}
