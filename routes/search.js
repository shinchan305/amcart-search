const client = require('./opensearch-client');

const searchProducts = function (req, res) {

    const body = getRequestBody(req);
    console.log('search:' + JSON.stringify(body));
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
                products: data.body.hits.hits.map(x => x._source),
                totalRecords: data.body.hits.total.value
            });
        }
    });
}

const getRequestBody = function (req, suffix) {
    if (req.query.query) {
        return {
            "from": req.query.from ? req.query.from : 0,
            "size": req.query.size ? req.query.size : 10,
            "query": {
                "bool": {
                    "should": [
                        {
                            "multi_match": {
                                "query": req.query.query,
                                "fields": [
                                    "*"
                                ]
                            }
                        }
                    ]
                }
            }
        }
    }
    else {
        let mustMatchQueries = [];
        let shouldMatchQueries = [];
        Object.keys(req.query).forEach((key) => {
            if (key !== 'from' && key !== 'size') {
                if (key === 'mainCategory' || key === 'categories') {
                    query = {
                        "match": {
                            [key]: req.query[key],
                        }
                    }
                    mustMatchQueries.push(query);
                }
                else {
                    let values = req.query[key].split(',');
                    if (values && values.length) {
                        values.forEach((value) => {
                            query = {
                                "match": {
                                    [key]: value,
                                }
                            }
                            shouldMatchQueries.push(query);
                        })
                    }
                }

                if (shouldMatchQueries.length) {
                    mustMatchQueries.push({
                        bool: {
                            should: shouldMatchQueries
                        }
                    })
                }
            }
        })
        return {
            "from": req.query.from,
            "size": req.query.size ? req.query.size : 10,
            "query": {
                "bool": {
                    "must": mustMatchQueries
                }
            }
        }
    }
}

module.exports = { searchProducts, getRequestBody };
