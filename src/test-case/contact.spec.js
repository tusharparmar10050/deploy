const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const authToken = require('./authtoken.spec.js')
chai.should();

chai.use(chaiHttp);

describe('conatct us api', () => {


    // contact us get route
    describe("GET /api/contact-us/listall", () => {
        it("it should GET all the contacts", (done) => {
            authToken((err, token) => {
                console.log(token)
                chai.request(server)
                .get("/api/contact-us/listall")
                .set('token', token)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status')
                    response.body.should.have.property('data')
                done();
                })
            })
        })
        it("it should NOT GET all the task", (done) => {
            // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImVtYWlsIjoiamFja0BnbWFpbC5jb20iLCJpYXQiOjE2Nzk0Njc4ODB9.RoR6SuXVjD8coiOgYEuYdxRgyJnpkoKArhRn5SwOXH8';
            chai.request(server)
            .get("/api/contact-us/li")
            // .set('token', token)
            .end((error, response) => {
                response.should.have.status(500);
            done();
            })
        })
    }),

    // post
    describe("POST /api/contact-us/", () => {
        it("it should POST all the task", (done) => {
            const contact = {
                name: "jaydeep",
                email: "jv@gmail.com",
                phone: "9090909090",
                message: "dgvsdgvhirk bvineionrgbv eoei"
            };
            chai.request(server)
                .post("/api/contact-us/create")
                .send(contact)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                done();
                })
        })
        
        
    })
})