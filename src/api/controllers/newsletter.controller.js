const contactusModule = require('../../modules/newsletter.js')
const newsletterModule = require('../../modules/newsletter.js')


const Newsletter = () => {
    return {

        createNewsletter: (req, res) => {
            const email = req.body.email
            newsletterModule.registerFornewsletter(email, (error, result) => {
                if (error) {
                    res.status(500).json({ error });
                }
                else {
                    res.status(200).json({ message: 'Email registered successfully!',result});
                }
            })


        },

        allNewsletter: (req, res) => {
            newsletterModule.getallNewsletter(function (error, data) {
                if (error) {
                    return res.status(500).json({
                        message: 'Error getting newsletter information',
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

module.exports = Newsletter