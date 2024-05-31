const express = require('express');
const { createSchema, client } = require('./model/Schema');
const dotenv = require('dotenv');
const cors = require('cors');

const signupRoute = require('./route/signupRoute');
const loginRoute = require('./route/loginRoute');
const adminMenuRoute = require('./route/adminAddMenu');
const dailyMenusRoute = require("./route/dailyMenusRoute");
const employeeChoicesRoute = require("./route/employeeChoicesRoute");
const selectLunchRoute =require("./route/selectLunchRoute");


const app = express();

dotenv.config();
const corsOptions = {
    origin: 'http://localhost:3000', // Frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
// Middleware to parse JSON request bodies
app.use(cors(corsOptions));

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
        app.use('/', selectLunchRoute);




        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error initializing schema', error);
        process.exit(1);
    }
};

startServer();
