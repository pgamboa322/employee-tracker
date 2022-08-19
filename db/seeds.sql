USE team_tracker_db;

INSERT INTO department(name)
VALUES
("Administration"),
("Teachers"),
("Custodians");

INSERT INTO role(title, salary, department_id)
VALUES
("Principal", 95000, 1),
("Department Chair", 165000, 2),
("Team Lead", 135000, 2),
("Head Custodian", 110000, 3),


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("Thuan", "Do", 1, NULL),
("Sharon", "Briscoe", 2, 1),
("Lauren", "Johnson", 3, 1),
("Jeffrey", "Wang", 3, 2);


