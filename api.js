import express from 'express';
import cors from 'cors';
import db from './operations/index.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
    res.send(await db.listDatabases());
});

app.get('/:database', async (req, res) => {
    res.send(await db.listCollections(req.params.database));
});

app.get('/:database/:collection', async (req, res) => {
    res.send(await db.findDocuments(req.params.database,req.params.collection,{}));
});

app.post('/:database/:collection', async (req, res) => {
    const filter = req.body;
    res.send(await db.findDocuments(req.params.database,req.params.collection,filter));
});

app.put('/create/:database', async (req, res) => {
    res.send(await db.createDatabase(req.params.database));
});

app.put('/create/:database/:collection', async (req, res) => {
    res.send(await db.createCollection(req.params.collection, req.params.database));
});

app.post('/create/:database/:collection', async (req, res) => {
    res.send(await db.insertDocument(req.params.database, req.params.collection, req.body));
});

app.post('/delete/:database/:collection', async (req, res) => {
    res.send(await db.deleteDocuments(req.params.database, req.params.collection, req.body));
});

app.post('/update/:database/:collection', async (req, res) => {
    res.send(await db.deleteDocuments(req.params.database, req.params.collection, req.body.filter, req.body.update));
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});