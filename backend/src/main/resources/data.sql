-- Seed roles
IF NOT EXISTS (SELECT 1 FROM employee_role WHERE role = 'Backend Developer')
INSERT INTO employee_role (role) VALUES ('Backend Developer');

IF NOT EXISTS (SELECT 1 FROM employee_role WHERE role = 'Frontend Developer')
INSERT INTO employee_role (role) VALUES ('Frontend Developer');

IF NOT EXISTS (SELECT 1 FROM employee_role WHERE role = 'Fullstack Developer')
INSERT INTO employee_role (role) VALUES ('Fullstack Developer');

IF NOT EXISTS (SELECT 1 FROM employee_role WHERE role = 'Designer')
INSERT INTO employee_role (role) VALUES ('Designer');


-- Seed teams
IF NOT EXISTS (SELECT 1 FROM team WHERE team = 'Engineering')
INSERT INTO team (team) VALUES ('Engineering');

IF NOT EXISTS (SELECT 1 FROM team WHERE team = 'Product')
INSERT INTO team (team) VALUES ('Product');


-- Seed skills
IF NOT EXISTS (SELECT 1 FROM skills WHERE skill_name = 'Java')
INSERT INTO skills (skill_name) VALUES ('Java');

IF NOT EXISTS (SELECT 1 FROM skills WHERE skill_name = 'Spring Boot')
INSERT INTO skills (skill_name) VALUES ('Spring Boot');

IF NOT EXISTS (SELECT 1 FROM skills WHERE skill_name = 'ReactJS')
INSERT INTO skills (skill_name) VALUES ('ReactJS');

IF NOT EXISTS (SELECT 1 FROM skills WHERE skill_name = 'Javascript')
INSERT INTO skills (skill_name) VALUES ('Javascript');

IF NOT EXISTS (SELECT 1 FROM skills WHERE skill_name = 'Typescript')
INSERT INTO skills (skill_name) VALUES ('Typescript');


-- Seed employees
IF NOT EXISTS (SELECT 1 FROM employee WHERE name = 'botn0ught')
INSERT INTO employee (name) VALUES ('botn0ught');

IF NOT EXISTS (SELECT 1 FROM employee WHERE name = 'backyardev')
INSERT INTO employee (name) VALUES ('backyardev');


-- botn0ught: Fullstack Developer
IF NOT EXISTS (
    SELECT 1
    FROM employee_role_links l
    JOIN employee e ON e.id = l.employee_id
    JOIN employee_role r ON r.id = l.role_id
    WHERE e.name = 'botn0ught' AND r.role = 'Fullstack Developer'
)
INSERT INTO employee_role_links (employee_id, role_id)
SELECT e.id, r.id
FROM employee e
         CROSS JOIN employee_role r
WHERE e.name = 'botn0ught' AND r.role = 'Fullstack Developer';


-- botn0ught: Engineering
IF NOT EXISTS (
    SELECT 1
    FROM employee_team_links l
    JOIN employee e ON e.id = l.employee_id
    JOIN team t ON t.id = l.team_id
    WHERE e.name = 'botn0ught' AND t.team = 'Engineering'
)
INSERT INTO employee_team_links (employee_id, team_id)
SELECT e.id, t.id
FROM employee e
         CROSS JOIN team t
WHERE e.name = 'botn0ught' AND t.team = 'Engineering';


-- botn0ught: Java, Spring Boot, TypeScript, ReactJS
INSERT INTO employee_skill_links (employee_id, skill_id)
SELECT e.id, s.id
FROM employee e
         CROSS JOIN skills s
WHERE e.name = 'botn0ught'
  AND s.skill_name IN ('Java', 'Spring Boot', 'Typescript', 'ReactJS')
  AND NOT EXISTS (
    SELECT 1
    FROM employee_skill_links l
    WHERE l.employee_id = e.id AND l.skill_id = s.id
);


-- backyardev: Backend Developer
IF NOT EXISTS (
    SELECT 1
    FROM employee_role_links l
    JOIN employee e ON e.id = l.employee_id
    JOIN employee_role r ON r.id = l.role_id
    WHERE e.name = 'backyardev' AND r.role = 'Backend Developer'
)
INSERT INTO employee_role_links (employee_id, role_id)
SELECT e.id, r.id
FROM employee e
         CROSS JOIN employee_role r
WHERE e.name = 'backyardev' AND r.role = 'Backend Developer';


-- backyardev: Engineering
IF NOT EXISTS (
    SELECT 1
    FROM employee_team_links l
    JOIN employee e ON e.id = l.employee_id
    JOIN team t ON t.id = l.team_id
    WHERE e.name = 'backyardev' AND t.team = 'Engineering'
)
INSERT INTO employee_team_links (employee_id, team_id)
SELECT e.id, t.id
FROM employee e
         CROSS JOIN team t
WHERE e.name = 'backyardev' AND t.team = 'Engineering';


-- backyardev: Java
INSERT INTO employee_skill_links (employee_id, skill_id)
SELECT e.id, s.id
FROM employee e
         CROSS JOIN skills s
WHERE e.name = 'backyardev'
  AND s.skill_name = 'Java'
  AND NOT EXISTS (
    SELECT 1
    FROM employee_skill_links l
    WHERE l.employee_id = e.id AND l.skill_id = s.id
);