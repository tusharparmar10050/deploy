const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const authToken = require('./authtoken.spec.js')

chai.should();

chai.use(chaiHttp);

describe('newsletter api', () => {


    // newsletter get route
    describe("GET /api/newsletter/listall", () => {
        it("it should GET all the newsletter", (done) => {
            authToken((err, token) => {
                chai.request(server)
                .get("/api/newsletter/listall")
                .set('token',token)
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
            chai.request(server)
            .get("/api/newsletter/listal")
            .end((error, response) => {
                response.should.have.status(500);
                response.body.should.be.a('object');
            done();
            })
        })
    }),

    // post
    describe("POST /api/newsletter", () => {
        it("it should POST email in newsletter", (done) => {
            const data = {
                email: "jv@gmail.com"
            };
            chai.request(server)
                .post("/api/newsletter/create")
                .send(data)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                done();
                })
        })
        // it("it should NOT POST email", (done) => {
            
        //     chai.request(server)
        //     .post("/api/newsletter/create")
        //     .set({email: "123"})
        //     .end((error, response) => {
        //         response.should.have.status(500);
        //     done();
        //     })
        // })
        
        
    })
})