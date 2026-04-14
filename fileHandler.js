// fileHandler.js
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "tasks.json");

function loadTasks() {
    try {
        if (!fs.existsSync(filePath)) return [];
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data || "[]");
    } catch (err) {
        console.error("Error loading tasks:", err.message);
        return [];
    }
}

function saveTasks(tasks) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    } catch (err) {
        console.error("Error saving tasks:", err.message);
    }
}

module.exports = { loadTasks, saveTasks };