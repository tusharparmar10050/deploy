const bcrypt = require('bcryptjs');
const con = require('../../config/database.js')
const express = require('express')
const jwt = require('jsonwebtoken')
require("dotenv").config();
const authModule = require('../../modules/auth.js')


const Auth = () => {
    return {
        createUser: (req, res) => {
            const salt = bcrypt.genSaltSync(10);
            const password = bcrypt.hashSync(req.body.password, salt);
            const value = [req.body.username, req.body.email, password]
            authModule.registerUser(value, (error, data) => {
                if (error) {
                    return res.status(500).json({ error });
                }
                else {
                    
                    return res.status(200).json({ message: 'User registered successfully!' });
                }
            });

        },


        loginUser: async (req, res) => {
            try {
                const  email = req.body.email;
                const  password = req.body.password;
            
                const user = await authModule.finduserByEmail(email);
                if (!user) return res.status(401).json({ error: 'Invalid email or password' });
            
                const match = await authModule.comparePassword(password, user.password);
                if (!match) return res.status(401).json({ error: 'Invalid email or password' });
                console.log(user)
                const token = await authModule.generateToken(user);
                res.status(200).json( token );
              } catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
              }
        },

        logOutuser: (req, res) => {
            const id = req.headers['id'];
            authModule.logoutUser(id, (err, numAffectedRows) => {
                if (err) {
                    res.status(500).json({message: "giving error in Logout"});
                }
                if (numAffectedRows === 0) {
                    res.status(404).json({message:'Token not found'});
                }

                else res.status(200).json({message:'Logout successfully'});
            });
        }

    }
}

module.exports = Auth;