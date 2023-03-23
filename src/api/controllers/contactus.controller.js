const con = require('../../config/database.js')
const contactusModule = require('../../modules/contactus.js')

const ContactUs = () => {
    return {

        createcontactus:  (req, res) => {
            const email = req.body.email
            const value = [req.body.name, req.body.email, req.body.phone, req.body.message]
            contactusModule.createContactus(value, email, (error, result) => {
                if (error) {
                    res.status(500).json({ error });
                }
                else {
                    res.status(200).json({ message: 'Email registered successfully!', result });
                } 
            })

        },

        allcontactus: (req, res) => {
            contactusModule.getcontactUs(function(error, data) {
                if (error) {
                    return res.status(500).json({
                        message: 'Error getting contact information',
                        error: error
                    });
                }
                return res.status(200).json({
                    status: "success",
                    data});
            })
        },
    }
}

module.exports = ContactUs