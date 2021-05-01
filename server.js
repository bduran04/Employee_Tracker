const connection = require('./connection');
require('console.table');
const cTable = require('console.table');
const { prompt } = require('inquirer');
const { listenerCount } = require('./connection');

mainPrompt();

async function mainPrompt() {
    const { response } = await prompt({
        type: 'list',
        name: 'response',
        message: 'What would you like to do?',
        choices: ["View Department", "View Roles", "View Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role"]
    })
    switch (response) {
        case 'View Employees':
            await viewTable('employee');
            break;
        case 'View Department':
            await viewTable('department');
            break;
        case 'View Roles':
            await viewTable('role');
            break;
        case 'Add Department':
            await addDepartment();
            break;
        case 'Add Employee':
            await addEmployee();
            break;
        case 'Add Role':
            await addRole();
            break;
        case 'Update Employee Role':
            await updateEmployeeRole();
            break;
        default: mainPrompt
    }
}

async function viewTable(tableName) {
    const tableData = await connection.query(`SELECT * FROM employeeDB.${tableName}`);
    const table = cTable.getTable(tableData)
    console.log(table)
}

async function addDepartment() {
    let departmentData = await prompt({
        type: 'input',
        name: 'departmentName',
        message: 'What Department would you like to add?'
    })
    connection.query('INSERT INTO employeeDB.department SET ?', {
        department_name: departmentData.departmentName
    },
        (err) => {
            if (err) throw err;
            console.log('The department has been added successfully added!');
            mainPrompt();
        }
    );
}

async function addEmployee() {
    const roles = await connection.query('SELECT * from employeeDB.role');
    const employees = await connection.query('SELECT * from employeeDB.employee');
    const roleList = [];
    const employeeList = [];

    roles.map(role => {
        roleList.push(role.title)
    });
    employees.map(employee => {
        return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }
    });

    roleList;
    employeeList;

    const employeeData = await prompt([{
        type: 'input',
        name: 'firstName',
        message: 'First Name?'
    }, {
        type: 'input',
        name: 'lastName',
        message: 'Last Name?'
    }, {
        type: 'list',
        name: 'roleId',
        message: 'What is the role of the employee?',
        choices: roleList
    }, {
        type: 'list',
        name: 'manager',
        message: 'Who is the manager for this employee?',
        choices: employeeList
    }])
    employeeData.roleId = await roleList.indexOf(employeeData.roleId) + 1;
    employeeData.manager = await employeeList.indexOf(employeeData.manager) + 1;
    connection.query('INSERT INTO employeeDB.employee SET ?', {
        first_name: employeeData.firstName,
        last_name: employeeData.lastName,
        role_id: employeeData.role,
        manager_id: employeeData.manager
    },
        (err) => {
            if (err) throw err;
            console.log('your role was successfully added!');
            mainPrompt();
        }
    );
}

async function addRole() {
    const departments = await connection.query('SELECT * from employeeDB.department');
    const departmentList = [];
    departments.map(department => {
        departmentList.push(department.department_name)
    });

    departmentList;

    const roleChoice = await prompt([{
        type: 'input',
        name: 'role',
        message: 'Role Name?'
    }, {
        type: 'input',
        name: 'salary',
        message: 'salary?'
    }, {
        type: 'list',
        name: 'departmentId',
        message: 'department?',
        choices: departmentList
    }])
    roleChoice.departmentId = departmentList.indexOf(roleChoice.departmentId) + 1;
    connection.query('INSERT INTO employeeDB.role SET ?', {
        department_id: roleChoice.departmentId,
        title: roleChoice.role,
        salary: roleChoice.salary
    },
        (err) => {
            if (err) throw err;
            console.log('your role was successfully added!');
            mainPrompt();
        }
    );
}

async function updateEmployeeRole() {
    const employees = await connection.query("SELECT * FROM employeeDB.employee");
    const employeeChoices = employees.map(employee => {
        return {
            name: `${employee.first_name} ${employee.last_name} `,
            value: employee.id
        }
    })
    //in role table change role titles 
    const roleChoices = roles.map(role => {
        return {
            name: role.title,
            value: role.id
        }
    })
    // prompt([{
    //which employee to upadte 
    //what new role to be?
    //in each question, type, name, message, choices
    //choices: employeeChoices
    //choices: roleChoices
    // }])
    // connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [
    //     //answer to the role question, answer to the emplyee question 
    // ])
}
