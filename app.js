/** Dependenciess */
const bodyparser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/database');

// DB connection
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('DB error ' + err);
});

const app = express();

const users = require('./routes/users');

const port = process.env.PORT || 8080;

// CORS MiddleWware
app.use(cors());

// Set Static Folder For Angular files
app.use(express.static(path.join(__dirname, 'public')));

// Body Parse Middleware
app.use(bodyparser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid end point.');
})

// Start server
app.listen(port, () => {
    console.log('Server started on: ' + port);
})