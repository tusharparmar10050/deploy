const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe } = require('mocha');
const server = require('../server.js');

chai.should();

chai.use(chaiHttp);
describe("PUT /api/user/ ", () => {
    it("it should update user", (done) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoicGtAZ21haWwuY29tIiwiaWF0IjoxNjc5NTUxMzc5fQ.ijd0LUo6-Q4ipKihuvzRewLaUEoq-7IBg2bRwZMkv2Y"
        const userId = 35
        const user = {
                "username":"jaydeep",
                "email": "jv@gmail.com"
        };
        chai.request(server)
            .put("/api/user/"+userId)
            .send(user)
            .set('token', token)
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('message').eq('User updated successfully!')
            done();
            })
    })
    // it("it should not update blogs", (done) => {
    //     const userId = 35
    //     const user = {
    //             "name":"jaydeep",
    //             "email": "jv@gmail.com"
    //     };
    //     chai.request(server)
    //         .put("/api/user/"+ userId)
    //         .send(user)
    //         .end((error, response) => {
    //             response.should.have.status(500);
    //             response.body.should.be.a('object');
    //             response.body.should.have.property('message').eq('Internal server error')
    //         done();
    //         })
    // })
    
    
}),

describe("delete user /api/user/ ", () => {
    it("it should delete user", (done) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoicGtAZ21haWwuY29tIiwiaWF0IjoxNjc5NTUxMzc5fQ.ijd0LUo6-Q4ipKihuvzRewLaUEoq-7IBg2bRwZMkv2Y"
        const userId = 79
        chai.request(server)
            .delete("/api/user/"+userId)
            .set('token', token)
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('message').eq('User deleted successfully!')
            done();
            })
    })
    it("it should not delete user", (done) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoicGtAZ21haWwuY29tIiwiaWF0IjoxNjc5NTUxMzc5fQ.ijd0LUo6-Q4ipKihuvzRewLaUEoq-7IBg2bRwZMkv2Y"
        const userId = 555
        chai.request(server)
            .delete("/api/user/"+ userId)
            .set('token', token)
            .end((error, response) => {
                response.should.have.status(404);
                response.body.should.be.a('object');
                response.body.should.have.property('message').eq('User not Exist otherwise User already Deleted')
            done();
            })
    })
})