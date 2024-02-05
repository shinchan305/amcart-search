const client = require('./opensearch-client');
const { getRequestBody } = require('./search');

const getFilters = function (req, res) {
    let body = getRequestBody(req);
    body.aggs = {
        "distinct_brands": {
            "terms": {
                "field": "brand",
                "size": 1000
            }
        }
    }
    client.search({
        index: 'product',
        body: body
    }, function (err, data) {
        if (err) {
            console.log(err)
            res.send({
                success: false,
                message: err
            });
        } else {

            res.send({
                success: true,
                data: {
                    filters: [
                        {
                            category: "Brand",
                            items: data.body.aggregations ? data.body.aggregations.distinct_brands.buckets.map(x => { return { id: x.key, value: `${x.key}` } }) : []
                        }
                    ]
                }
            });
        }
    });
}

module.exports = { getFilters };