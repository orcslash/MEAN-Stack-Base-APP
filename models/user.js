const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

/**
 * User profile schema for User creation.
 * @author Mintautas Kiulkys
 */
const UserSchema = mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    phone: { type: String },
    email: { type: String, required: false },
    username: { type: String, required: false },
    password: { type: String, required: false }
});

/** Exports User class */
const ListOfUsers = 'users';
const User = module.exports = mongoose.model('User', UserSchema, ListOfUsers);

/** 
 * Returns user by it's Id.
 * @param id user id.
 * @param callback
 * @returns User profile be it's Id.
*/
module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

/**
 * Returns user by it's Username.
 * @param username of the user
 * @param callback
 * @returns User by it's Username
 */
module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    User.findOne(query, callback);
}

/**
 * TODO
 */
module.exports.getAllUsers = function () {
}


/**
 * Takes new user object, encrypts it's password and writes it to databse.
 * @param newUser {User} object with parameters.
 * @callback
 */
module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(callback);
        });
    });

}

/**
 * Verify given password to grant athentication.
 * @param candidatePassword given password by input.
 * @param hash encrypted password.
 */
module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        callback(null, isMatch);
    });
}