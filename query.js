const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password123',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

const getAllDepartments = async () => {
    const data = await db.promise().execute("SELECT * FROM `department`");
    return data[0];
}

const getAllRoles = async () => {
    const data = await db.promise().execute(
        "SELECT `role`.`id`, `role`.`title`, `department`.`name` AS `department`, `role`.`salary`\
         FROM `role`\
         JOIN `department`\
         ON `role`.`department_id` = `department`.`id`\
         ORDER BY `role`.`id` ASC");
    return data[0];
}
const getAllEmployees = async () => {
    const data = await db.promise().execute(
        "SELECT `e`.`id`, `e`.`first_name`, `e`.`last_name`, `r`.`title`, `d`.`name` AS `department`, `r`.`salary`, CONCAT(`m`.`first_name`, ' ', `m`.`last_name`) AS `manager`\
         FROM `employee` e\
         JOIN `role` r\
         ON `r`.`id` = `e`.`role_id`\
         JOIN `department` d\
         ON  `r`.`department_id` = `d`.`id`\
         LEFT JOIN `employee` m\
         ON `e`.`manager_id` = `m`.`id`\
         ORDER BY `e`.`id` ASC");
    return data[0];
}

const addDepartment = async (name) => {
    await db.promise().execute(
        "INSERT INTO `department` (name)\
        VALUES (?)", [name]);
}

const addRole = async (title, salary, dept) => {
    await db.promise().execute(
        "INSERT INTO `role` (title, salary, department_id)\
        VALUES (?, ?, ?)", [title, salary, dept]);
}

const addEmployee = async (first, last, title, manager) => {
    console.log({first, last, title, manager})
    await db.promise().execute(
        "INSERT INTO `employee` (first_name, last_name, role_id, manager_id)\
        VALUES (?, ?, ?, ?)", [first, last, title, manager]);
}

const updateEmployee = async (title, id) => {
    await db.promise().execute(
        "UPDATE `employee`\
        SET `role_id` = ?\
        WHERE employee.id = ?", [title, id]);
}

module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployee,
};