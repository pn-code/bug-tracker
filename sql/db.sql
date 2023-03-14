-- Creating Users Table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(30) NOT NULL,
    assigned_project INT NOT NULL,
    created_on TIMESTAMP NOT NULL
);

-- Creating Issues Table
CREATE TABLE issues (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    related_project INT NOT NULL,
    assigned_to INT NOT NULL,
    created_on TIMESTAMP NOT NULL,
    created_by VARCHAR(50),
    status VARCHAR(30),
    priority VARCHAR(30),
    target_resolution_date DATE,
    actual_resolution_date DATE
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