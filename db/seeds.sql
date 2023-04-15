INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Engineer', 250000, 1),
       ('Software Engineer' 102000, 1),
       ('Account Manager', 150000, 2),
       ('Accountant', 60000, 2),
       ('Lawyer', 100000, 3),
       ('Legal Team Lead', 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mike', 'Chan', 6, NULL),
       ('Tom', 'Allen', 5, 1),
       ('Sarah', 'Lourd', 3, NULL),
       ('Ashley', 'Rodriquez', 4, 3),
       ('Anthony', 'Brown', 1, NULL ),
       ('Kunal', 'Singh', 2, 5);
    