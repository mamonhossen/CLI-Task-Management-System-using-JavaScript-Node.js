// app.js
const readline = require("readline");
const { loadTasks, saveTasks } = require("./fileHandler");
const {
    addTask,
    deleteTask,
    updateStatus,
    searchTasks,
    groupByPriority
} = require("./taskService");

const {
    validateTitle,
    validatePriority,
    validateDate,
    formatPriority
} = require("./utils");

let tasks = loadTasks();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {
    console.log("\n========= TASK MANAGER =========");
    console.log("1. Add Task");
    console.log("2. View Tasks");
    console.log("3. Search Task");
    console.log("4. Update Task Status");
    console.log("5. Delete Task");
    console.log("6. Exit");
    console.log("================================");

    rl.question("Enter your choice: ", handleMenu);
}

function handleMenu(choice) {
    switch (choice) {
        case "1": return addTaskCLI();
        case "2": return viewTasks();
        case "3": return searchTaskCLI();
        case "4": return updateStatusCLI();
        case "5": return deleteTaskCLI();
        case "6": console.log("Goodbye!");
            rl.close();
            break;
        default:
            console.log("Invalid choice!");
            menu();
    }
}

// ADD TASK
function addTaskCLI() {
    rl.question("Enter Title: ", title => {
        if (!validateTitle(title)) {
            console.log("Error: Title cannot be empty");
            return menu();
        }

        rl.question("Enter Description: ", description => {
            rl.question("Enter Priority (Low/Medium/High): ", priority => {
                if (!validatePriority(priority)) {
                    console.log("Error: Invalid priority");
                    return menu();
                }

                rl.question("Enter Due Date (YYYY-MM-DD): ", dueDate => {
                    if (!validateDate(dueDate)) {
                        console.log("Error: Invalid date format");
                        return menu();
                    }

                    try {
                        tasks = addTask(tasks, {
                            title,
                            description,
                            priority: formatPriority(priority),
                            dueDate
                        });

                        saveTasks(tasks);
                        console.log("Task added successfully!");
                    } catch (err) {
                        console.log("Error:", err.message);
                    }

                    menu();
                });
            });
        });
    });
}

// VIEW TASKS
function viewTasks() {
    const grouped = groupByPriority(tasks);

    Object.keys(grouped).forEach(priority => {
        console.log(`\n${priority.toUpperCase()} PRIORITY`);
        grouped[priority].forEach((t, i) => {
            console.log(
                `${i + 1}. [${t.id}] ${t.title} | ${t.description} | ${t.status} | Due: ${t.dueDate}`
            );
        });
    });

    menu();
}

// SEARCH
function searchTaskCLI() {
    rl.question("Enter search keyword: ", keyword => {
        const results = searchTasks(tasks, keyword);

        if (!results.length) {
            console.log("No tasks found.");
        } else {
            results.forEach(t => {
                    console.log(`[${t.id}] ${t.title} | ${t.description} | ${t.status} | Due: ${t.dueDate}`);
});
        }

        menu();
    });
}

// UPDATE STATUS
function updateStatusCLI() {
    rl.question("Enter Task ID: ", id => {
        id = Number(id);

        rl.question("Enter Status (Pending/In Progress/Completed): ", status => {
            
            // ✅ validation has been added for status input
            if (!status || status.trim() === "") {
                console.log("Error: Status not entered!, please enter a valid status");
                return menu();
            }

            try {
                tasks = updateStatus(tasks, id, status);
                saveTasks(tasks);
                console.log("Status updated!");
            } catch (err) {
                console.log("Error:", err.message);
            }

            menu();
        });
    });
}

// DELETE
function deleteTaskCLI() {
    rl.question("Enter Task ID: ", id => {
        id = Number(id);

        rl.question("Are you sure? (y/n): ", confirm => {
            if (confirm.toLowerCase() === "y") {
                try {
                    tasks = deleteTask(tasks, id);
                    saveTasks(tasks);
                    console.log("Task deleted successfully.");
                } catch (err) {
                    console.log("Error:", err.message);
                }
            }
            menu();
        });
    });
}

menu();