// utils.js

function validateTitle(title) {
    return title && title.trim() !== "";
}

function validatePriority(priority) {
    const valid = ["low", "medium", "high"];
    return valid.includes(priority.toLowerCase());
}

function validateDate(date) {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

function generateId(tasks) {
    return tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 101;
}

function formatPriority(priority) {
    return priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();
}

module.exports = {
    validateTitle,
    validatePriority,
    validateDate,
    generateId,
    formatPriority
};