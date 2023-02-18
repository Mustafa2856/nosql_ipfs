import express from 'express';
import db from './operations/index.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// Define middleware function for user validation
function validateUser(req, res, next) {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        req.user = { username: 'admin' };
        next();
    } else {
        res.status(401).send('Invalid username or password');
    }
}

function validateDataType(dataType) {
    return function (req, res, next) {
        if (typeof req.body === dataType) {
            next();
        } else {
            res.status(400).send(`Invalid data type: expected ${dataType}`);
        }
    }
}

const getAESKey = async (username, password) => {
    let encoder = new TextEncoder();
    let secretKey = await crypto.subtle.importKey(
        "raw",
        encoder.encode(username + password),
        "PBKDF2",
        false,
        ["deriveBits", "deriveKey"]
    );
    let AESKey = await crypto.subtle.deriveKey({
        "name": "PBKDF2",
        salt: Buffer.from(username),
        "iterations": 100000,
        "hash": "SHA-256"
    },
        secretKey,
        { "name": "AES-CBC", "length": 256 },
        true,
        ["encrypt", "decrypt"]
    );
    return AESKey;
}

const loginUser = async (username, password) => {
    let AESKey = await getAESKey(username, password);
    let iv = Buffer.from((username + 'username12345678901234567890').slice(0, 16));
    let response = await fetch(serverURL + "/login/" + username, {
        method: "GET",
        cache: "no-cache"
    });

    if (response.ok) {
        let keyPair = await response.json();
        let decryptedPrivateKey = await crypto.subtle.decrypt(
            {
                name: "AES-CBC",
                iv: iv,
            },
            AESKey,
            Buffer.from(keyPair['private_key'], 'base64')
        );
        saveUserKeys(username, keyPair['public_key'], Buffer.from(decryptedPrivateKey).toString('base64'))
    } else {
        console.log('Login error');
    }
}

const registerUser = async (username, email, password) => {

    let response = await fetch(serverURL + "/register", {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            'username': username,
            'status': 'ok'
        })
    });
    if (response.ok) {
        saveUserKeys(username, publicKeyString, privateKey.toString('base64'));
        return true;
    }
    return false;
}


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