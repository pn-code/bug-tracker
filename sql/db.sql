-- Creating Users Table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(30) NOT NULL,
    created_on TIMESTAMP NOT NULL
);

-- Creating Issues Table
CREATE TABLE issues (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    related_project INT NOT NULL REFERENCES projects (id),
    assigned_to INT NOT NULL REFERENCES users (id),
    created_on TIMESTAMP NOT NULL,
    created_by INT REFERENCES users (id),
    status VARCHAR(30),
    priority VARCHAR(30),
    target_resolution_date DATE,
    actual_resolution_date DATE
);

-- Creating Log Table
CREATE TABLE logs (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    modified_date TIMESTAMPTZ NOT NULL,
    modified_by BIGSERIAL REFERENCES users (id),
    issue_id BIGSERIAL REFERENCES issues (id),
    new_actual_resolution_date DATE,
    new_assigned_to INT,
    new_status VARCHAR(30)
);

-- Creating Comments Table
CREATE TABLE comments (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    created_on TIMESTAMPTZ NOT NULL,
    content VARCHAR(300) NOT NULL,
    issue_id BIGSERIAL REFERENCES issues (id),
    user_id BIGSERIAL REFERENCES users (id)
);

-- Creating Projects Table
CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_on TIMESTAMP NOT NULL,
    created_by VARCHAR(50) NOT NULL
);

-- Additional Constraints

-- For Number Constraints, include:
check(<number> >=1 and <number> <= 5)

-- Manually inserting data into our table
INSERT INTO users (full_name, email, role, assigned_project, created_on) VALUES ('Admin', 'admin@gmail.com', 'admin', 0, NOW());

-- To select all data entries from a specific table
SELECT * from users;

-- To select specific columns to return
SELECT full_name, role from users;

-- Drop Table
DROP TABLE users;

-- UPDATE USER ROLE
UPDATE users SET role = 'admin' WHERE id = 2;

-- JOIN query for issues and users and projects
SELECT 
  issues.*, 
  users.name AS created_by_name,
  users1.name AS assigned_to_name,
  projects.name AS project_name
FROM 
  issues 
  JOIN users ON issues.created_by::bigint = users.id
  JOIN users users1 ON issues.assigned_to::bigint = users1.id
  JOIN projects ON issues.related_project::bigint = projects.id
WHERE 
  issues.id = 1;