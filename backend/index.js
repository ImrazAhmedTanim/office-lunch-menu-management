const express = require('express');
const { Client } = require('pg');


const app = express();


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

const port = 4000;
app.listen(port,()=>{
     console.log(`server is running on ${port}`);
     });