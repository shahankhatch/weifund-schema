'use strict';

const validate = require('../index.js');

const assert = require('assert');

// empty campaign instance from which schema is derived
const data = require('../weifund-schema-empty.json');
const exp0 = {}; // expect no errors

// campaign instance with missing required property "anonymous"
const data1 = require('./weifund-campaign/test-01.json');
const exp1 = require('./weifund-campaign/test-01-expected.json');

// campaign instance with missing required property "compiler"
const data2 = require('./weifund-campaign/test-02.json');
const exp2 = require('./weifund-campaign/test-02-expected.json');

// campaign instance that is valid and contains bignumber
const data3 = require('./weifund-campaign/test-03.json');
const exp3 = {}; // expect no errors

// expected result if all error messages are being logged from ajv
// not used in current setup
//const cleanResult = { 'result': true, 'errors': null, 'bignumber': true };

// the .message property is cleared from validation due to parsing of quotes in the message

console.log('validate');
console.log(validate);

function validateDataOnSchema(data, expected) {
    var valid = validate.validateCampaignInstance(data);
    console.log(valid, valid.errors, expected);

    if (valid.errors) {
    valid.errors[0].message = '';
    expected.message = '';
    assert.deepEqual(expected, valid.errors[0]);
    } else {
    assert.deepEqual(expected, {});
    }

}

describe('schema tests', function() {
    it('should return no error for the empty schema', function() {
	validateDataOnSchema(data.campaignSchema,exp0);
    });
    it('should return a single error which says that there is a missing "anonymous" key', function() {
	validateDataOnSchema(data1,exp1);
    });
    it('should return a single error which says that there is a missing "compiler" key', function() {
	validateDataOnSchema(data2,exp2);
    });
    it('should validate the bignumber entry without error', function() {
	validateDataOnSchema(data3,exp3);
    });
});
