'use strict';

// schema validation library
const Ajv = require('ajv');
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

// adding support for type searches
const jp = require('jsonpath');

// adding support for BigNumber validation
const BigNumber = require('bignumber.js');

/* Schemas */

// campaign specification schema
const schemaCampaign = require('./weifund-schema.json');


/* Type validators */

// big number type validator
const bnvalidate = function(o) {
    try {
	new BigNumber(o);
	return true;
    } catch(e) {
	return false;
    }
};

// validate the instance against the vetting specification
const validateVettingInstance = function(dataInput) {
    // compile the vetting schema
    try {
      // instantiate a new instance of Ajv solely for the vetting specification
      const ajv1 = Ajv({
	  "allErrors": false
      });

      // add all vetting schema elements to a new Ajv instance
      ajv1.addSchema(require('./weifund-schema-vetting.json'), 'vetting_root');
      ajv1.addSchema(require('./v.specification.json'),'specification');
      ajv1.addSchema(require('./v.test_measures.json'),'test_measures');
      ajv1.addSchema(require('./v.test_measure.json'),'test_measure');
      ajv1.addSchema(require('./v.test_results.json'),'test_results');
 
      // get the root element to validate against the instance data
      const schemaVetting = ajv1.getSchema('vetting_root');	

      // perform the validation against the input
      const validate = schemaVetting(dataInput);

      // return the validation result
      return { 'result': validate, 'errors': schemaVetting.errors };
    } catch (e) {
      console.error(e);
    }
    return { 'result': 'compile-error' };

};

const validateCampaignInstance = function(dataInput) {
    // validate json instance using json schema and ajv
    const validate = ajv.compile(schemaCampaign);

    // validate keys that have label bignumber
    // use jsonpath to query the relevant entities

    // validate elements of type bignumber
    // support for bignumber is enabled by type-checking values for all keys labeled 'bignumber'
    // TODO check how support for this is expressed in the campaign schema
    var bns = jp.query(dataInput, 'bignumber');

    // TODO improve rudimentary bignumber fast-failure
    var bnresult = bns.every(function(o) { return bnvalidate(o); });

    return { 'result': validate(dataInput), 'errors': validate.errors , 'bignumber' : bnresult };
};

// currently exports weifund validators
// TODO extend with other campaign validators
module.exports = {
  'schemas': { 
    'campaign': schemaCampaign
  },
  'validateCampaignInstance': validateCampaignInstance,
  'validateVettingInstance': validateVettingInstance
};
