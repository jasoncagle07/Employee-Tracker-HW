const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");

var PORT = process.env.PORT || 8080;


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Evelyn11",
    database: "employee_tracker",
});
  
connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
    // run the    mainOptions function after the connection is made to prompt the user
    
    displayAll();
});
function displayAll(){
    connection.query(`SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary, department.name
    FROM employee 
    INNER JOIN 
    role 
    on employee.role_id=role.id
    LEFT OUTER JOIN
    department 
    on role.department_id=department.id;`, function(err,res) {
        if (err) throw err;
        console.table(res)
        mainOptions()
    })
}

function mainOptions() {
    inquirer.prompt ({
      name: "commandQuestions",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add Departments", "Add Roles", "Add Employee","View Departments","View Roles","View Employee","Update Employee Roles"]
    })
    
    .then(function(answer) {
        console.log(answer.commandQuestions);
        switch(answer.commandQuestions){
            case"Add Departments":
            addDepartments();
            break;
    
          case "Add Roles":
            addRoles();
            break;
    
          case "Add Employee":
            addEmployee();
            break;
    
          case "View Departments":
            viewDepartments();
            break;
    
          case "View Roles":
            viewRoles();
            break;
            case "View Employee":
            viewEmployee();
            break;
    
          case "Update Employee Roles":
            updateEmployeeRoles();
            break;
        }
    
        
    });

}

function addDepartments(){
    return inquirer.prompt (
        {
            type:"input",
            name:"department",
            message:"Enter New Department Name"
        }
    )
    
      .then(function (answer) {
         const name = answer.department
         connection.query("INSERT INTO department (name) VALUES ( ? )", name, (err, res) => {
            if (err) throw err;

            console.log("New Department Updated: " + name);
            mainOptions();
         });
     });
}

function addRoles(){
    return inquirer.prompt ([
        {
            type:"input",
            name:"roleTitle",
            message:"Enter New Role Name"
        },
        {
            type:"input",
            name:"roleSalary",
            message:"Enter New Role Salary"
        },
        {
            type:"input",
            name:"roleDepartmentId",
            message:"Enter New Role Department ID"
        }
    ])
    
      .then(function (answer) {
         const title = answer.roleTitle
         const salary = parseInt(answer.roleSalary)
         const department_id = parseInt(answer.roleDepartmentId)
         connection.query("INSERT INTO role (title, salary, department_id) VALUES ( ?, ?, ? )", [title, salary, department_id], function (err, res) {
            if (err) throw err;

            console.log("New Role Updated: " + title + salary + department_id);
            mainOptions();
         });
     });
}

function addEmployee(){
    return inquirer.prompt ([
        {
            type:"input",
            name:"first_name",
            message:"Enter Employee First Name"
        },
        {
            type:"input",
            name:"last_name",
            message:"Enter Employee Last Name"
        },
        {
            type:"input",
            name:"role_id",
            message:"Enter Employee Role ID"
        },
        {
            type:"input",
            name:"manager_id",
            message:"Please Enter Employee Manager ID"
        }
    ])
    
      .then(function (answer) {
         const first_name = answer.first_name
         const last_name = answer.last_name
         const role_id = parseInt(answer.role_id)
         const manager_id = parseInt(answer.manager_id)
         connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ? )", [first_name, last_name, role_id, manager_id], function (err, res) {
            if (err) throw err;

            console.log("New Employee Updated: " + first_name + last_name  + role_id + manager_id);
            mainOptions();
         });
     });
    
}

function viewDepartments(){
    var query = "SELECT id, name FROM department";
    connection.query(query, function(err, res)  {
      console.table(res);
      mainOptions();
    })  
}

function viewRoles(){
    var query = "SELECT id, title, salary, department_id FROM role";
    connection.query(query, function(err, res)  {
      console.table(res);
      mainOptions();
    })
}

function viewEmployee(){
    var query = "SELECT * FROM employee";
    connection.query(query, function(err, res)  {
      console.table(res);
      mainOptions();
    })
}

function updateEmployeeRoles(){
    return inquirer.prompt ([
        {
            type:"input",
            name:"updateFirst_name",
            message:"Employee First Name"
        },
        {
            type:"input",
            name:"updateLast_name",
            message:"Employee Last Name"
        },
        {
            type:"input",
            name:"updateRole_id",
            message:"Update Employee Role ID"
        }
        
    ])
    
      .then(function (answer) {
         const first_name = answer.updateFirst_name
         const last_name = answer.updateLast_name
         const role_id = parseInt(answer.updateRole_id)
         connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [role_id,first_name], function (err, res) {
            if (err) throw err;

            console.log(" Employee Role Updated: " + role_id);
            mainOptions();
         });
     });
   
}