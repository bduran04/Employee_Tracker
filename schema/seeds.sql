USE employeeDB;

INSERT INTO department (department_name)
VALUES ("Sales");
INSERT INTO department (department_name)
VALUES ("Engineering");
INSERT INTO department (department_name)
VALUES ("Legal");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", "1", "2");
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Rodriguez", "2", NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Christian", "Eckerode", "3", "2");
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sam", "Trakhtenbroit", "4", NULL);

INSERT INTO role (title, salary, department_id)
VALUES ("sales lead", 10000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("project manager", 90000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("software engineer", 200000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead attorney", 90000, 3);