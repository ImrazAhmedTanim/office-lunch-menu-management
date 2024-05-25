const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'office-lunch-menu-management',
    password: '109259',
    port: 5432,
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Connection error', err.stack));

const createSchema = async () => {
    try {
        // Create Employees Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS employees (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Create Roles Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS roles (
                id SERIAL PRIMARY KEY,
                role_name VARCHAR(50) UNIQUE NOT NULL
            );
        `);

        // Create EmployeeRoles Table with Composite Primary Key and Foreign Keys
        await client.query(`
            CREATE TABLE IF NOT EXISTS employee_roles (
                employee_id INT NOT NULL,
                role_id INT NOT NULL,
                PRIMARY KEY (employee_id, role_id),
                FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
                FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
            );
        `);

        // Create Menus Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS menus (
                id SERIAL PRIMARY KEY,
                menu_date DATE NOT NULL,
                lunch_option VARCHAR(255) NOT NULL,
                UNIQUE (menu_date, lunch_option)
            );
        `);

        // Create EmployeeChoices Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS employee_choices (
                id SERIAL PRIMARY KEY,
                employee_id INT NOT NULL,
                menu_id INT NOT NULL,
                choice_date DATE NOT NULL,
                FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
                FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE CASCADE,
                UNIQUE (employee_id, choice_date)
            );
        `);

        // Insert Default Roles
        await client.query(`
            INSERT INTO roles (role_name) VALUES ('admin') ON CONFLICT (role_name) DO NOTHING;
            INSERT INTO roles (role_name) VALUES ('user') ON CONFLICT (role_name) DO NOTHING;
        `);

        console.log('Schema created successfully');
    } catch (error) {
        console.error('Error creating schema', error.stack);
    }
    // Do not close the client here
};

module.exports = { createSchema, client };
