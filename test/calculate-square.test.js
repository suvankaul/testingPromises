// import the function on what the test case is to be written
const calculateSquare = require('../src/calculateSquare.js');

//import chai, chai-as-promised
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised'); //extension of chai. dont neeed to run test cases
chai.use(chaiAsPromised); //chai-as-promised is to be injected in chai
const expect = chai.expect; //import assertion function from chai to compare the expexcted results with actual results in our tests.

//Describe(testSuite, f()) - Use to group the test cases that belong together into a test suites
describe('calculateSquare',function(){
    //it() - used to create test cases
    it('should resolve with number 4 if passed number 2', function(){
        //eventually - Provided by chai-as-promised library and will wait until the promise becomes resolve/rejected and then compares its value with expected one. Need return stmt to work (signals asynchronous test completion).
        return expect(calculateSquare(2)).to.eventually.be.equal(4);
    })
    it('should become fulfilled when passed no 2',function(){
        //fulfilled - checks if promise if fulfilled.
        return expect(calculateSquare(2)).to.be.fulfilled
    })
    it('should reject when incorrect values are passed', function(){
        //rejected - checks if promise is rejected
        return expect(calculateSquare("abc")).to.be.rejected;
    })
    //notify - if dont want to use return, use notify to tell mocha that asynchronous test execution is completed. Need to pass the value of call back function 
    it('should return 9 if passed number is 3', function(done){
        expect(calculateSquare(3)).to.eventually.be.equal(9).notify(done)
    })

    //-----------------NOTE------------------------
    // - If return/notify is not mentioned, then test cases will always pass even before the execution of promise/ function used for test case completes execution
    // - By default timeout for mocha is 2000ms. To increase timeout add 'this.timeout(new_time_in_ms)' inside the callback f() in it(). Always keep an extra time of 1000ms to ensure that test case completes. To apply it to all cases without adding in each of them, add 'this.timeout(new_time_in_ms)' in describe()

    //To use multiple assertions in single test case: return promise.then() in callback having expect stmts

    // To check fulfilled promises
    it("should check multiple assertion", function(){
        return(calculateSquare(2)).then(res => {
            expect(res).to.be.equal(4);
            expect(res).to.be.below(5);
        })
    })

    //To check rejected promises
    it('should check for wrong input values', function(){
        return (calculateSquare('abc').catch(err => {
            expect(err).to.not.equal(null);
            expect(err.message).to.equal('Invalid data type')
        }))
    })

    
})