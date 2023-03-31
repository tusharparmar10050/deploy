const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe } = require('mocha');
const server = require('../server.js');
const con = require('../config/database.js')
const  { expect }  = chai;
const authToken = require('./authtoken.spec.js')


chai.should();

chai.use(chaiHttp);
describe("PUT /api/user/ ", () => {
    it("it should update user", (done) => {
      authToken((err, token) => {
        const user = {
                  "username":"jaydeep",
                  "email": "jv@gmail.com"
          };
          chai.request(server)
              .put("/api/user/1")
              .send(user)
              .set('token', token)
              .end((error, response) => {
                  response.should.have.status(200);
                  response.body.should.be.a('object');
                  response.body.should.have.property('message').eq('User updated successfully!')
              done();
              })
            })
    }),
    it("it should not update blogs", (done) => {
        const user = {
                "name":"jaydeep",
                "email": "jv@gmail.com"
        };
        chai.request(server)
            .put("/api/user/55555555")
            .send(user)
            .end((error, response) => {
                response.should.have.status(500);
                response.body.should.be.a('object');
                // response.body.should.have.property('message').equal('Error deleting User')
            done();
            })
    })
    
    
}),
describe("delete user /api/user/ ", () => {
    
    it('should delete a user from the database', (done) => {
      authToken((err, token) => {
        // Insert a user into the database to be deleted
        con.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)', ['John Doe', 'johndoe@example.com', 'tp162244'], (err, result) => {
          if (err) {
            console.error('error inserting user: ' + err.stack);
            // done(err);
          } else {
            // Delete the user from the database
            const deleteQuery = 'DELETE FROM user WHERE id = ?';
            const deleteValues = [result.insertId];
            con.query(deleteQuery, deleteValues, (err) => {
              if (err) {
                console.error('error deleting user: ' + err.stack);
                // done(err);
              } else {
                const userId = result.insertId - 1;
        
                // Make a DELETE request to the API to delete the user
                chai.request(server)
                  .delete(`/api/user/${userId}`)
                  .set('token', token)
                  .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eq('User deleted successfully')
        
                    // Check that the user was actually deleted from the database
                    const selectQuery = 'SELECT * FROM user WHERE id = ?';
                    const selectValues = [userId];
                    con.query(selectQuery, selectValues, (err, result) => {
                      if (err) {
                        console.error('error selecting user: ' + err.stack);
                        // done(err);
                      } else {
                        expect(result.length).to.equal(0);
                        // done();
                      }
                    });
                  });
              }
            });
          }
        })
        });
      });
    it("it should not delete user", (done) => {
      authToken((err, token)=> { 
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
})