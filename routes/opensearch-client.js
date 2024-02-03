'use strict';

var { Client } = require('@opensearch-project/opensearch');
const config = require('./config');

const client = new Client({
    ssl: {
        rejectUnauthorized: false,
    },
    node: config.opensearch_config.host,
    auth: config.opensearch_config.auth,
});

module.exports = client;