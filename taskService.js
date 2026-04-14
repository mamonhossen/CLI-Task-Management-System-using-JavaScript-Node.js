// taskService.js
const { generateId } = require("./utils");

function addTask(tasks, newTask) {
    const duplicate = tasks.find(
        t =>
            t.title.toLowerCase() === newTask.title.toLowerCase() &&
            t.dueDate === newTask.dueDate
    );

    if (duplicate) {
        throw new Error("Task with same title and due date already exists.");
    }

    newTask.id = generateId(tasks);
    newTask.status = "Pending";
    tasks.push(newTask);

    return tasks;
}

function deleteTask(tasks, id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error("Task not found");

    tasks.splice(index, 1);
    return tasks;
}

function updateStatus(tasks, id, status) {
    const task = tasks.find(t => t.id === id);
    if (!task) throw new Error("Task not found");

    task.status = status;
    return tasks;
}

function searchTasks(tasks, query) {
    query = query.toLowerCase();

    return tasks.filter(t =>
        t.title.toLowerCase().includes(query) ||
        t.status.toLowerCase().includes(query) ||
        t.priority.toLowerCase().includes(query)
    );
}

function groupByPriority(tasks) {
    return {
        High: tasks.filter(t => t.priority === "High"),
        Medium: tasks.filter(t => t.priority === "Medium"),
        Low: tasks.filter(t => t.priority === "Low")
    };
}

module.exports = {
    addTask,
    deleteTask,
    updateStatus,
    searchTasks,
    groupByPriority
};