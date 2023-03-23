// const assert = require('chai').assert
// const should = require('chai').should()
// const expect = require('chai').expect


// describe('Aspect check', function(){

//     let userName = 'code improve';
//     let mylist = {
//         item:[{
//             id:1,name:'demo'
//         }],
//         title:'user list'
//     }
//     it("check string", function(){
//         assert.typeOf(userName, 'string')
//     })
//     it("equal match", function(){
//         assert.equal(userName, 'code improve')
//     })
//     it("length match", function(){
//         assert.lengthOf(mylist.item, 1)
//     })
// })

// describe('should check', function(){
//     let userName = 'code improve';
//     let mylist = {
//         item:[{
//             id:1,name:'demo'
//         }],
//         title:'user list'
//     }
//     it('check string', function(){
//         userName.should.be.a('string');
//     })
//     it('equal check', function(){
//         userName.should.equal('code improve');
//     })
//     it('length check', function(){
//         mylist.should.have.property('item').with.lengthOf(1);
//     })
// });

// describe("check expect", function(){
//     let userName = 'code improve';
//     let mylist = {
//         item:[{
//             id:1,name:'demo'
//         }],
//         title:'user list',
//         address:{
//             country:'India',
//             phoneNo:['9090909090', '7878787878']
//         }
//     }

//     it('string match', function(){
//         expect(userName).to.be.a('string')
//     })
    
//     it('string match', function(){
//         expect(userName).to.equal('code improve')
//     })
  
//     it('string match', function(){
//         expect(userName).to.lengthOf(12)
//     })
    
//     it('object length', function(){
//         expect(mylist).to.have.property('item').with.lengthOf(1)
//     })
    
//     it('api object match', function(){
//         expect(mylist).to.have.all.keys('item', 'title', 'address')
//     })
    
//     it('phone no', function(){
//         expect(mylist).to.have.nested.property('address.phoneNo[1]')
//     })
    
//     it('country name', function(){
//         // expect(mylist).to.have.nested.include({'address.country':'India'})
//         expect(mylist).to.have.nested.include({'address.phoneNo[1]':'7878787878'})
//     })
// })