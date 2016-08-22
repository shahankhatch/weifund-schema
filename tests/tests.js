const schema = require('../weifund-schema.json');

const data1 = require('./test-01.json');
const data2 = require('./test-02.json');

const exp1 = require('./test-01-expected.json');
const exp2 = require('./test-02-expected.json');

const Ajv = require('ajv');
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
const validate = ajv.compile(schema);

const assert = require('assert')

// the .message property is cleared from validation due to parsing of quotes in the message

describe('schema tests', function() {
    describe('#test-01', function() {
	it('should return a single error which says that there is a missing "anonymous" key', function() {
	    var valid1 = validate(data1);
//	    console.log(valid1);

	    validate.errors[0].message = "";
	    exp1.message = "";
	    
//	    console.log(validate.errors[0]);
//	    console.log(exp1);

	    assert.deepEqual(validate.errors[0], exp1);
	});
    });
    describe('#test-02', function() {
	it('should return a single error which says that there is a missing "compiler" key', function() {
	    var valid2 = validate(data2);
//	    console.log(valid2);

	    validate.errors[0].message = "";
	    exp2.message = "";
	    
//    	    console.log(validate.errors[0]);
//	    console.log(exp2);
	    
	    assert.deepEqual(validate.errors[0], exp2);
	});
    });
});

