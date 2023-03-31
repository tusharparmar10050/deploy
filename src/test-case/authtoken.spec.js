const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');

chai.use(chaiHttp);

function authToken(callback) {
    const user = {
        email: "pk@gmail.com",
        password: "tp162244"
    };
    chai.request(server)
    .post("/api/auth/login")
    .send(user)
    .end((err, res) => {
        if (err) {
          callback(err);
        } else {
          callback(null, res.body.token);
        }
    });
}

module.exports = authToken
