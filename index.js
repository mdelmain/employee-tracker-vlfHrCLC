const inquirer = require("inquirer");

// Array menu items for selection
const menu = [
    {
      type: "list",
      name: "start",
      message: "What would you like  to do?",
      choices: [
        'View all departments', 
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Quit'
      ],
    },
  ];