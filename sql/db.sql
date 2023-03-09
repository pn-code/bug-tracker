-- Creating User Table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    full_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role VARCHAR(30) NOT NULL,
    assigned_project INT NOT NULL,
    created_on timestamp NOT NULL
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