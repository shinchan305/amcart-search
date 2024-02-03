const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    opensearch_config: {
      host: process.env.OPENSEARCH_HOST,
      auth: {
        username: process.env.OPENSEARCH_USER,
        password: process.env.OPENSEARCH_PASS
      }
    }
};