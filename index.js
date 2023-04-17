const inquirer = require("inquirer");
const query = require("./query.js");
const cTable = require("console.table");

// Initial inquirer menu choices
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

    // Process menu selection
    if (choice.start == "View all departments") {
      const data = await query.getAllDepartments();
      console.table(data);
    } else if (choice.start == "View all roles") {
      const data = await query.getAllRoles();
      console.table(data);
    } else if (choice.start == "View all employees") {
      const data = await query.getAllEmployees();
      console.table(data);
    } else if (choice.start == "Add a department") {
      const dept = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Enter the department name",
        validate: (text) => {
          return text.length <= 30;
        },
      });
      await query.addDepartment(dept.name);

      // Add a role menu selection
    } else if (choice.start == "Add a role") {
      const dept_list = await query.getAllDepartments();
      const dept_choices = dept_list.map(({ id, name }) => ({
        name: name,
        value: id,
      }));
      const role = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the role title",
          validate: (text) => {
            return text.length <= 30;
          },
        },
        {
          type: "input",
          name: "salary",
          message: "Enter the role salary",
        },
        {
          type: "list",
          name: "dept",
          message: "Select the role department",
          choices: dept_choices,
        },
      ]);
      await query.addRole(role.title, role.salary, role.dept);

      // Add an employee menu selection
    } else if (choice.start == "Add an employee") {
      const mngr_list = await query.getAllEmployees();
      const mngr_choices = mngr_list.map(({ id, first_name, last_name }) => ({
        name: first_name + " " + last_name,
        value: id,
      }));
      const role_list = await query.getAllRoles();
      const role_choices = role_list.map(({ id, title }) => ({
        name: title,
        value: id,
      }));
      const employee = await inquirer.prompt([
        {
          type: "input",
          name: "first_name",
          message: "Enter the employee's first name",
          validate: (text) => {
            return text.length <= 30;
          },
        },
        {
          type: "input",
          name: "last_name",
          message: "Enter the employee's last name",
          validate: (text) => {
            return text.length <= 30;
          },
        },
        {
          type: "list",
          name: "title",
          message: "Enter the employee's role title",
          choices: role_choices,
        },
        {
          type: "list",
          name: "manager",
          message: "Enter the employee's manager",
          choices: mngr_choices,
        },
      ]);
      await query.addEmployee(
        employee.first_name,
        employee.last_name,
        employee.title,
        employee.manager
      );

      // Update an employee role menu selection
    } else if (choice.start == "Update an employee role") {
      const employee_list = await query.getAllEmployees();
      const employee_choices = employee_list.map(
        ({ id, first_name, last_name }) => ({
          name: first_name + " " + last_name,
          value: id,
        })
      );
      const role_list = await query.getAllRoles();
      const role_choices = role_list.map(({ id, title }) => ({
        name: title,
        value: id,
      }));
      const update = await inquirer.prompt([
        {
          type: "list",
          name: "employee",
          message: "Select an employee to update",
          choices: employee_choices,
        },
        {
          type: "list",
          name: "title",
          message: "Select a new employee role",
          choices: role_choices,
        },
      ]);
      await query.updateEmployee(update.title, update.employee);
    }
  }
};

// Function call to initialize app
init();
