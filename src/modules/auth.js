const con = require('../config/database.js')
const bcrypt = require('bcryptjs');
require("dotenv").config();
const jwt = require('jsonwebtoken')


exports.registerUser = (value, callback) => {
    con.query(`INSERT INTO user(username , email , password) VALUES(?, ?, ?)`, value, (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            console.log('User added successfully!');
            callback(null, result);
        }
    })

};

exports.finduserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM user WHERE email = ?', [email], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

exports.comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
};

exports.generateToken = (user) => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY);
        con.query('UPDATE user SET token = ? WHERE id = ?', [token, user.id], (error) => {
            if (error) return reject(error);
            resolve({
                success: true, token: token, data: {
                    user_id: user.id
                }, message: 'Login successful'
            });
        });
    });

}

exports.logoutUser = (id, callback) => {
    con.query(`UPDATE user SET token = null WHERE id = ?`, [id], (err, result) => {
        if (err) {
            return callback(err);

        }

        callback(null, result.changedRows);
    });
};

exports.verifyUser = (jwt_token, callback) => {

    const decode = jwt.verify(jwt_token, process.env.JWT_KEY);
    con.query(`SELECT * FROM user WHERE id = ?`, [decode.userId], (err, user) => {
        if (err) {
            callback(err);
        }
        callback(null, user);
    })
}