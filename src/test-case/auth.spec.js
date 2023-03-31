const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe } = require('mocha');
const server = require('../server.js');




chai.should();

chai.use(chaiHttp);

describe("POST /api/auth/ ", () => {
    it("it should register user", (done) => {
        const user = {
            username: "piyush",
            email: "pk@gmail.com",
            password: "tp162244"
        };
        chai.request(server)
            .post("/api/auth/register")
            .send(user)
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('message')
            done();
        })
    }),
    it("it should not register user", (done) => {
        const user = {
            name: "piyush",
            email: "pk@gmail.com",
            password: "tp162244"
        };
        chai.request(server)
        .post("/api/auth/register")
        .send(user)
        .end((error, response) => {
            response.should.have.status(500);
            response.body.should.be.a('object');
            response.body.should.have.property('error')
            done();
        })
    })
    
    
})


describe("POST FOR LOGIN /api/auth/ ", () => {
    it("it should login user", (done) => {
        const user = {
            email: "pk@gmail.com",
            password: "tp162244"
        };
        chai.request(server)
            .post("/api/auth/login")
            .send(user)
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('token')
            done();
            })
    }),
    it("it should not login user", (done) => {
        const user = {
            email: "pk@gmail.com",
            password: "tp16224"
        };
        chai.request(server)
            .post("/api/auth/login")
            .send(user)
            .end((error, response) => {
                response.should.have.status(401);
                response.body.should.be.a('object');
                response.body.should.have.property('error').eq("Invalid email or password")
            done();
            })
    })
    
    
})

describe("POST FOR LOGOUT /api/auth/ ", () => {
    it("it should logout user", (done) => {
        chai.request(server)
            .post("/api/auth/logout")
            .set('id', '20')
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('message').eq('Logout successfully')
            done();
            })
    }),
    it("it should not logout user", (done) => {
        chai.request(server)
            .post("/api/auth/logout")
            .set('id', '10')
            .end((error, response) => {
                response.should.have.status(404);
                response.body.should.be.a('object');
                response.body.should.have.property('message').eq("Token not found")
            done();
            })
    })
    
    
})
