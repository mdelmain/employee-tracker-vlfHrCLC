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
    const data = await db.promise().execute("SELECT * FROM `role`");
    return data[0];
}
const getAllEmployees = async () => {
    const data = await db.promise().execute("SELECT * FROM `employee`");
    return data[0];
}

module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
};