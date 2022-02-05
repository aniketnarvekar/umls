const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const queries = require('./queries');

app.use (bodyParser.json ());

app.listen (port, () => {
    console.log (`App running on port ${port}.`);
});

app.get('/', (req, res) => {
    res.json({greeting: 'Hello World!!!'});
})

app.get ('/api/metathesaurus/relation', async (request, response) => {
    try {
	let res = await queries.getRelation();
	 response.status(200).json(res);
    } catch (err) {
	throw err;
    }
});

app.get('/api/metathesaurus/concept/relation', async (request, response) => {
    try {
	let res = await queries.getConceptRelation(request.query.id);
	response.status(200).json(res);
    } catch (err) {
	throw err;
    }
});

