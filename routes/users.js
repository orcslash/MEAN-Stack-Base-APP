const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const mongoose = require('mongoose');
const mongo = require('mongodb').MongoClient;

/**
 * For user operations refer to User = require('../models/user');
 */
router.post('/register', (req, res, next) => {

    let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to create new user.' })
        } else {
            res.json({ success: true, msg: 'New user created.' })
        }
    });
});

router.post('/listusers', (req, res, next) => {

});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

/**
 * Retrieves all users from database.
 */
router.get('/get-data', function (req, res, next) {
    var resultArray = [];
    mongo.connect(config.database, function (err, db) {
        var cursor = db.collection('users').find();
        cursor.forEach(function (doc, err) {
            resultArray.push(doc);
        }, function () {
            db.close();
            res.json(resultArray);
        });
    });
});


module.exports = router;