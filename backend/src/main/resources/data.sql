-- This script runs after Hibernate has created or updated the entity tables.
-- MERGE statements make it safe to run on every application start.
MERGE INTO employee_role (role) KEY (role) VALUES ('Backend Developer');
MERGE INTO employee_role (role) KEY (role) VALUES ('Frontend Developer');
MERGE INTO employee_role (role) KEY (role) VALUES ('Fullstack Developer');
MERGE INTO employee_role (role) KEY (role) VALUES ('Designer');

MERGE INTO team (team) KEY (team) VALUES ('Engineering');
MERGE INTO team (team) KEY (team) VALUES ('Product');

MERGE INTO skills (skill_name) KEY (skill_name) VALUES ('Java');
MERGE INTO skills (skill_name) KEY (skill_name) VALUES ('Spring Boot');
MERGE INTO skills (skill_name) KEY (skill_name) VALUES ('ReactJS');
MERGE INTO skills (skill_name) KEY (skill_name) VALUES ('Javascript');
MERGE INTO skills (skill_name) KEY (skill_name) VALUES ('Typescript');

INSERT INTO employee (name)
SELECT 'botn0ught'
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE name = 'botn0ught');

INSERT INTO employee (name)
SELECT 'backyardev'
WHERE NOT EXISTS (SELECT 1 FROM employee WHERE name = 'backyardev');

MERGE INTO employee_role_links (employee_id, role_id) KEY (employee_id, role_id)
SELECT employee.id, employee_role.id
FROM employee, employee_role
WHERE employee.name = 'botn0ught' AND employee_role.role = 'Fullstack Developer';

MERGE INTO employee_team_links (employee_id, team_id) KEY (employee_id, team_id)
SELECT employee.id, team.id
FROM employee, team
WHERE employee.name = 'botn0ught' AND team.team = 'Engineering';

MERGE INTO employee_skill_links (employee_id, skill_id) KEY (employee_id, skill_id)
SELECT employee.id, skills.id
FROM employee, skills
WHERE employee.name = 'botn0ught' AND skills.skill_name IN ('Java', 'Spring Boot', 'Typescript', 'ReactJS');

MERGE INTO employee_role_links (employee_id, role_id) KEY (employee_id, role_id)
SELECT employee.id, employee_role.id
FROM employee, employee_role
WHERE employee.name = 'backyardev' AND employee_role.role = 'Backend Developer';

MERGE INTO employee_team_links (employee_id, team_id) KEY (employee_id, team_id)
SELECT employee.id, team.id
FROM employee, team
WHERE employee.name = 'backyardev' AND team.team = 'Engineering';

MERGE INTO employee_skill_links (employee_id, skill_id) KEY (employee_id, skill_id)
SELECT employee.id, skills.id
FROM employee, skills
WHERE employee.name = 'backyardev' AND skills.skill_name = 'Java';
