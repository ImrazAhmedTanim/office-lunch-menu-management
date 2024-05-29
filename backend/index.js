const express = require('express');
const { createSchema, client } = require('./model/Schema');
const dotenv = require('dotenv');
const signupRoute = require('./route/signupRoute');
const loginRoute = require('./route/loginRoute');
const adminMenuRoute = require('./route/adminAddMenu');
const dailyMenusRoute = require("./route/dailyMenusRoute");
const employeeChoicesRoute = require("./route/employeeChoicesRoute");


const app = express();
dotenv.config();

// Middleware to parse JSON request bodies
app.use(express.json());

// Initialize the database schema and start the server
const startServer = async () => {
    try {
        await createSchema();
        console.log('Schema initialized');

        // Use routes
        app.use('/', signupRoute);
        app.use('/', loginRoute);
        app.use('/', adminMenuRoute);
        app.use('/', dailyMenusRoute);
        app.use('/', employeeChoicesRoute);




        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error initializing schema', error);
        process.exit(1);
    }
};

startServer();
