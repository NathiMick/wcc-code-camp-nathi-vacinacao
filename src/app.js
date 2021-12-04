const swaggerUI = require("swagger-ui-express");

const express = require('express');
const cors = require('cors');

const db = require('./data/database');
const index = require('./routes/index');
const usersRoutes = require('./routes/users.routes');
const vaccinesRoutes = require('./routes/vaccines.routes');

const swaggerDocs = require("./swagger.json");

const app = express();

db.connect();

app
.use(cors())
.use(express.json())

.use('/', index)
.use('/users',usersRoutes)
.use('/vaccines', vaccinesRoutes)
.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))



//Access permissions for Front-End
.options("/*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers")
    res.header(
      "Access-Control-Allow-Methods",
      "PUT,POST,GET,DELETE,OPTIONS,PATCH"
    );
    res.send();
})


  module.exports = app;