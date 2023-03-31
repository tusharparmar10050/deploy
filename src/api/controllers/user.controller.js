const con = require('../../config/database.js')
const jwt = require('jsonwebtoken')
require("dotenv").config();
const userModule = require('../../modules/user.js')

// const { create } = require('../service/user.service.js')


const User = () => {
    return {

        
        updateUser: async (req, res) => {
            const id = req.params.id;
            const { username, email } = req.body;
            try {
                const user = await userModule.updateUser(username, email, id);
                res.status(200).json({ message: 'User updated successfully!', user });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'An error occurred while updating user.', error });
            }

        },

        deleteUser: (req, res) => {
            const id = req.params.id;
            userModule.deleteUser(id, (error, result) => {
                if (error) res.status(500).json({message: 'Error deleting User'});
                else if (result.affectedRows == 0) res.status(404).json({message: 'User not Exist otherwise User already Deleted'});
                else res.status(200).json({message:'User deleted successfully'})
            })
        }
        
    }

}

module.exports = User