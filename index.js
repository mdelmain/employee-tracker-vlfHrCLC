const inquirer = require("inquirer");
const query = require("./query.js");
const cTable = require("console.table");

const init = async () => {
  while (true) {
    const choice = await inquirer.prompt({
      type: "list",
      name: "start",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Quit",
      ],
    });
    if (choice.start == "View all departments") {
      const data = await query.getAllDepartments();
      console.table(data);
    } else if (choice.start == "View all roles") {
      const data = await query.getAllRoles();
      console.table(data);
    } else if (choice.start == "View all employees") {
      const data = await query.getAllEmployees();
      console.table(data);
    }
  }
};

// Function call to initialize app
init();
