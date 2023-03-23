const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe } = require('mocha');
const server = require('../server.js');

chai.should();

chai.use(chaiHttp);
describe("GET /api/blog", () => {
    it("it should GET all the task", (done) => {
        chai.request(server)
        .get("/api/blog")
        .end((error, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status')
            response.body.should.have.property('data')
        done();
        })
    })
    it("it should NOT GET all the task", (done) => {
        chai.request(server)
        .get("/api/blo")
        .end((error, response) => {
            response.should.have.status(404);
        done();
        })
    })
}),

//get by id
describe("GET /api/blog", () => {
    it("blog should GET by id", (done) => {
        const blogId = 100
        chai.request(server)
        .get("/api/blog/" + blogId)
        .end((error, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('id')
            response.body.should.have.property('image')
            response.body.should.have.property('title')
            response.body.should.have.property('subtitle')
            response.body.should.have.property('date')
            response.body.should.have.property('blogby')
            response.body.should.have.property('html')
        done();
        })
    })
    it("blog should NOT GET by id", (done) => {
        const blogId = 561
        chai.request(server)
        .get("/api/blog/" + blogId)
        .end((error, response) => {
            response.should.have.status(404);
            response.body.should.be.a('object');
            response.body.should.have.property('message')
        done();
        })
    })
}),

// post
describe("POST /api/blog/create", () => {
    it("it should POST blogs", (done) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoicGtAZ21haWwuY29tIiwiaWF0IjoxNjc5NTUxMzc5fQ.ijd0LUo6-Q4ipKihuvzRewLaUEoq-7IBg2bRwZMkv2Y"
        const contact = {
            image: "https://images.freeimages.com/images/large-previews/a3e/wild-horse-1334844.jpg",
            title: "helloyh 123",
            subtitle: "world yb  hbh",
            date: "2023-03-07 00:00:00",
            blogby: 19,
            html: "<h1>hello wyjhmolrd</h1>"
        };
        chai.request(server)
            .post("/api/blog/create")
            .send(contact)
            .set('token', token)
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('message')

            done();
            })
    })
    
    
}),

// put
describe("PUT /api/blog/ ", () => {
    it("it should update blogs", (done) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoicGtAZ21haWwuY29tIiwiaWF0IjoxNjc5NTUxMzc5fQ.ijd0LUo6-Q4ipKihuvzRewLaUEoq-7IBg2bRwZMkv2Y"
        const userId = 89
        const blog = {
            image: "https://images.freeimages.com/images/large-previews/a3e/wild-horse-1334844.jpg",
            title: "helloyh 1",
            subtitle: "world yb  hbh",
            date: "2023-03-05 00:00:00",
            blogby: 19,
            html: "<h1>hellonikn wyjhmolrd</h1>"
        };
        chai.request(server)
            .put("/api/blog/"+userId)
            .set('token', token)
            .send(blog)
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('message').eq("Record updated successfully.")
            done();
            })
    }),
    it("it should not update blogs", (done) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoicGtAZ21haWwuY29tIiwiaWF0IjoxNjc5NTUxMzc5fQ.ijd0LUo6-Q4ipKihuvzRewLaUEoq-7IBg2bRwZMkv2Y"
        const userId = 520
        const blog = {
            image: null,
            title: "helloyh 1",
            subtitle: "world yb  hbh",
            date: "2023-03-05 00:00:00",
            blogby: 19,
            html: "<h1>hellonikn wyjhmolrd</h1>"
        };
        chai.request(server)
            .put("/api/blog/"+userId)
            .set('token', token)
            .send(blog)
            .end((error, response) => {
                response.should.have.status(500);
                response.body.should.be.a('object');
                response.body.should.have.property('error').eq("Please input proper fileds otherwise you input same data.")
            done();
            })
    })
    
    
})

delete blog
describe("DELETE /api/blog", () => {
    it("blog should DELETE by id", (done) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoicGtAZ21haWwuY29tIiwiaWF0IjoxNjc5NTUxMzc5fQ.ijd0LUo6-Q4ipKihuvzRewLaUEoq-7IBg2bRwZMkv2Y"
        const blogId = 76
        chai.request(server)
        .delete("/api/blog/" + blogId)
        .set('token', token)
        .end((error, response) => {
            response.should.have.status(200);
            // response.body.should.be.a('object');
            // response.body.should.have.property('message').equal("Blog has been deleted succsesfully")
        done();
        })
    })
    it("blog should NOT delete by id", (done) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoicGtAZ21haWwuY29tIiwiaWF0IjoxNjc5NTUxMzc5fQ.ijd0LUo6-Q4ipKihuvzRewLaUEoq-7IBg2bRwZMkv2Y"
        const blogId = 561
        chai.request(server)
        .delete("/api/blog/" + blogId)
        .set('token', token)
        .end((error, response) => {
            response.should.have.status(404);
            response.body.should.be.a('object');
            response.body.should.have.property('error')
        done();
        })
    })
})


