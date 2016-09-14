/*******

This test checks that the Weifund Vetting schema is well-formed and that a sample instance conforms to the schema

*******/

'use strict';

// schema validation library
const validate = require('../index.js');

// sample instance of vetting specification
const vettingInstance01 = require('./weifund-vetting/weifund_attestation_01.json');

const vettingInstance02 = require('./weifund-vetting/weifund_attestation_01-invalid.json');
const vettingInstance02Expected = require('./weifund-vetting/weifund_attestation_01-invalid-expected.json');

// assertion library
const assert = require('assert');

// clean expected result
// not used in current setup
//const cleanResult = { 'result': true, 'errors': null };
const emptyResult = {}; // expect empty result as valid in current setup

function validateDataOnSchema(data, expected) {
    const valid = validate.validateVettingInstance(data);
//    console.log(valid, valid.errors, expected);

    if (valid.errors) {
    valid.errors[0].message = '';
    expected.message = '';
    assert.deepEqual(expected, valid.errors[0]);
    } else {
    assert.deepEqual(expected, {});
    }

}

describe('vetting schema tests', function() {

    it('should validate the sample instance', function() {
	validateDataOnSchema(vettingInstance01, emptyResult);
    });

    it('should invalidate a bad instance', function() {
        validateDataOnSchema(vettingInstance02, vettingInstance02Expected);
    });
});
