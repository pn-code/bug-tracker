-- Creating User Table
CREATE TABLE users (
    id BIGSERIAL NOT NULL,
    full_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role VARCHAR(30) NOT NULL,
    assigned_project INT NOT NULL,
    created_on timestamp NOT NULL
);

-- Manually inserting data into our table
INSERT INTO users (id, full_name, email, role, assigned_project, created_on) VALUES (123, 'Admin', 'admin@gmail.com', 'admin', 0, NOW());

-- To select all data entries from a specific table
SELECT * from users;

-- To select specific columns to return
SELECT full_name, role from users;

-- Drop Table
DROP TABLE users;