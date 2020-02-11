DROP DATABASE IF EXISTS employee_tracker;
create database employee_tracker;

use employee_tracker; 

CREATE TABLE department (
	id INTEGER NOT NULL auto_increment,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
    );
    
CREATE TABLE role (
	id INTEGER NOT NULL auto_increment,
	title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    PRIMARY KEY(id)
    );
    
CREATE TABLE employee (
	id INTEGER NOT NULL auto_increment,
	first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER NOT NULL,
    PRIMARY KEY(id)
);    

INSERT INTO employee (first_name,last_name,role_id,manager_id) values ('Jason', 'Cagle', 1, 440);
INSERT INTO employee (first_name,last_name,role_id,manager_id) values ('Emily', 'Shaye', 2, 441);
INSERT INTO employee (first_name,last_name,role_id,manager_id) values ('Jessica', 'Cagle', 3, 442);
INSERT INTO employee (first_name,last_name,role_id,manager_id) values ('Charlotte', 'Evelyn', 4, 443);

SELECT * FROM employee;

INSERT INTO role (title, salary,department_id) values ('Developer', 70000, 1);
INSERT INTO role (title, salary,department_id) values ('Manager', 35000, 2);
INSERT INTO role (title, salary,department_id) values ('Associate', 20000, 3);
INSERT INTO role (title, salary,department_id) values ('Intern', 55000, 4);


SELECT * FROM role;

INSERT INTO department (name) values ('IT');
INSERT INTO department (name) values ('HR');
INSERT INTO department (name) values ('Customer Service');
INSERT INTO department (name) values ('Marketing');

SELECT * FROM department;

SELECT employee.first_name,employee.last_name,employee.role_id,employee.manager_id, role.title, role.salary
FROM employee 
INNER JOIN role on employee.role_id=role.id ;

SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary, department.name
FROM employee 
INNER JOIN 
role 
on employee.role_id=role.id
LEFT OUTER JOIN
department 
on role.department_id=department.id;
