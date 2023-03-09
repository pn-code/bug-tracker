-- Creating User Table
CREATE TABLE users (
    id INT,
    full_name VARCHAR(50),
    email VARCHAR(100),
    role VARCHAR(30),
    assigned_project INT,
    created_on timestamp
);

-- Manually inserting data into our table
INSERT INTO users (id, full_name, email, role, assigned_project, created_on) VALUES (123, 'Admin', 'admin@gmail.com', 'admin', 0, NOW());