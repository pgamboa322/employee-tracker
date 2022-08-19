const mySQL = require("mysql2");
const inquirer = require("inquirer");
const connection = require("./db/connection");
const utils = require("util");
const table = require("console.table");

const departments = [];

function employeeTracker() {
    inquirer
      .prompt({
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
          "View team departments",
          "View team roles",
          "View team employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update current employee role",
          "Quit",
        ],
      })
      .then((res) => {
        switch (res.choices) {
          case "View team departments":
            viewDepts();
            break;
  
          case "View team roles":
            viewRoles();
            break;
  
          case "View team employees":
            viewEmps();
            break;
  
          case "Add a department":
            addDepartment();
            break;
  
          case "Add a role":
            addRole();
            break;
  
          case "Add an employee":
            addEmployee();
            break;

            case "Update employee role":
                updateEmployeeRole(updateRole);
                break;  
  
          case "Quit":
            console.log("Done tracking your team?");
            connection.end();
            break;
        }
      });
  }

  // Function to view departments

function viewDepts() {
    connection.query("SELECT * FROM department", (err, data) => {
      if (err) throw err;
      console.table(data);
      employeeTracker();
    });
  }
  
  // Function to view roles
  
  function viewRoles() {
    connection.query("SELECT * FROM employee", (err, data) => {
      if (err) throw err;
      console.table(data);
      employeeTracker();
    });
  }
  
  // Function to view employees
  
  function viewEmps() {
    connection.query("SELECT * FROM employee", (err, data) => {
      if (err) throw err;
      console.table(data);
      employeeTracker();
    });
  }

  // Adding in a new department
function addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "department",
          message: "Add a new department: ",
          validate: (responses) => {
            if (responses) {
              return true;
            } else {
              console.log("Input new department name.");
            }
          },
        },
      ])
      .then((responses) => {
        connection.query(
          "INSERT INTO department SET ?",
          {
            name: responses.department,
          },
          (error) => {
            if (error) throw error;
            console.log(`New Department ${responses.department} added!`);
            employeeTracker();
          }
        );
      });
  }
  
  // Function to add an employee
  function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "Input employee's first name",
        },
  
        {
          type: "input",
          name: "last_name",
          message: "Input employee's last name",
        },
  
        {
          type: "input",
          name: "role_id",
          message: "Input Employee's role ID",
        },
  
        {
          type: "input",
          name: "manager_id",
          message: "Input Employee's manager id",
        },
      ])
      .then((responses) => {
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: responses.first_name,
            last_name: responses.last_name,
            role_id: responses.role_id,
            manager_id: responses.manager_id,
          },
          (error) => {
            if (error) throw error;
            console.log(`New employee ${responses.employee} added!`);
            employeeTracker();
          }
        );
      });
    const selectRole = "SELECT * FROM employee, role";
    connection.query(selectRole, (error, results) => {
      if (error) throw error;
      console.table(results);
    });
  }
  
  
  // Function to add new role

function addRole() {
    console.log("new role");
    const selectDepartment = departmentId.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
  
    inquirer
      .prompt([
        {
          type: "input",
          name: "role",
          message: "Input title of new role",
          validate: (responses) => {
            if (responses) {
              return true;
            } else {
              console.log("Title of role is needed");
            }
          },
        },
  
        {
          type: "input",
          name: "salary",
          message: "Input salary of new role",
          validate: (responses) => {
            if (responses) {
              return true;
            } else {
              console.log("Salary required!");
            }
          },
        },
  
        {
          type: "list",
          name: "department",
          message: "Select the department this role belongs to:",
          choices: selectDepartment,
          validate: (responses) => {
            if (responses) {
              return true;
            } else {
              console.log("error");
            }
          },
        },
      ])
      .then((responses) => {
        connection.query(
          `INSERT INTO role SET ?`,
          {
            title: responses.role,
            salary: responses.salary,
            department_id: responses.department,
          },
          (error) => {
            if (error) throw error;
            console.log(`New role ${responses.role} added!`);
            viewRoles();
            employeeTracker();
          }
        );
      });
  }

  // Function that updates an employee's info 

function updateEmployeeRole(employeeRole, employeeId) {
    let updateRole = connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [employeeRole, employeeId],
      function (err, role) {
        if (err) throw err;
        updateEmployeeRole(updateRole);
        // employeeTracker();
      });
    
  }
  
  // View team departments
  function viewDepts() {
    connection.query("SELECT * FROM department", (error, data) => {
      if (error) throw error;
      console.table(data);
      employeeTracker();
    });
  }
  
  // View team roles
  function viewRoles() {
    connection.query("SELECT * FROM role", (error, data) => {
      if (error) throw error;
      console.table(data);
      employeeTracker();
    });
  }
  
  // View all team employees
  function viewEmps() {
    connection.query("SELECT * FROM employee", (error, data) => {
      if (error) throw error;
      console.table(data);
      employeeTracker();
    });
  }
  
  const departmentId = [];

  // sql query to show connected records from departments

function populateTeam() {
    connection.query("SELECT name FROM department", (error, data) => {
      if (error) throw error;
      for (let i = 0; i < data.length; i++) {
        departments.push(data[i].name);
      }
      console.log(departments);
    });
    deptId.length = 0;
    connection.query("SELECT * FROM department", (error, data) => {
      if (error) throw error;
      for (let i = 0; i < data.length; i++) {
        departmentId.push(data[i]);
      }
      console.log(departmentId);
    });
  };
  
  populateTeam();
  employeeTracker();
  