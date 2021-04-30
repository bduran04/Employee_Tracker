const connection = require('./connection');
require('console.table');
const cTable = require('console.table');
const {prompt} = require('inquirer');
const { listenerCount } = require('./connection');

mainPrompt();

async function mainPrompt() {
const {response} = await prompt({
    type: 'list',
    name: 'response',
    message: 'What would you like to do?',
    choices: ["View Department", "View Roles", "View Employees", "Add Departents", "Add Roles", "Add Employee", "Update employee role"]
})
console.log(response)
    switch(response) {
        case 'View Employees':
            viewTable('employee');
            break;
        case 'View Department':
            viewTable('department');
            break;
        case 'View Roles':
            viewTable('role');
            break;
        case 'Add Employee':
            const {employeeData} = await prompt({
                type: 'list',
                name: 'response',
                message: 'First Name?'
            })
            addToTable(employeeData, 'employee');
            break;
            case 'Add Roles':
                const departments = await connection.query('SELECT * from employeeDB.department');
                departmentList = [];
                departments.map(department => {
                    departmentList.push(departmentList.name);
                })
                const {roleChoice} = await prompt([{
                    type: 'input',
                    name: 'role',
                    message: 'Role Name?'
                }, {
                    type: 'input',
                    name: 'salary',
                    message: 'salary?'
                },
                {
                    type: 'list',
                    name: 'departmentId',
                    message: 'department?',
                    choices: departmentList
                }])
                roleChoice.department = departmentList.findIndex(roleChoice.department);
                addToTable(roleChoice, 'role');
                break;
    }
}

async function viewTable(tableName) {
    const employees = await connection.query(`SELECT * FROM employeeDB.${tableName}`);
    const table = cTable.getTable(employees)
    console.log(table)
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

async function addToTable(name, table) {
    await connection.query(`INSERT INTO employeeDB.${table} (name) VALUES (${name}`);
}

async function addRole(data) {
    await connection.query(`INSERT INTO employeeDB.role (department_id, title, salary) VALUES (${data.departmentId}, ${data.role},${data.salary}`)
}

function editTable(name, table) {
    // need from the user the values they are updated
    // UPDATE `employeeDB`.`${table}` SET `department_id` = '1' WHERE (`id` = '1');
}


function createTableRow() {
    // 1. Fetch DATA Using that query
    //
    // 2. USE DATA FROM SQL QUERY
    // map over data and construct a "row"
    // employees.map((employee) => {
    // tableData = `${employee.id}   ${employee.first_name}  ${employee.ast_name} \n` + tableData
    //});
    //
    //
    // return this kind of object
    // to debug, console log tableData after mapping over
    // `id   first_name  last_name
    //  id_2   first_name_2  last_name_2 `
}


function removeEmployee() {
    // inquirer.prompt()
}