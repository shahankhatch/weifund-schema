'use strict';

const weifundSchema = require('./index.js');
const instanceExample = require('./weifund-schema-example.json');
const generatedCampaignSchema = './weifund-schema.json';

const generate = function() {
try {
  weifundSchema.writeSchemaFromInstance(instanceExample, generatedCampaignSchema);
} catch (e) {
  console.error(e);
}
};

generate();

