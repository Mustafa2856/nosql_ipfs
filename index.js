const express = require('express');
const app = express();

app.get('/', (req, res) => {

    res.send('Hello world!!!');

});

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


app.post('/switchdatabse', validateUser,validateDataType('String'),(req, res) => {
    const id = req.body.id;
});


app.post('/CreateCollection',validateUser,validateDataType('Object'), (req, res) => {

});

app.post('/InsertDocument', validateUser,validateDataType('Object'), (req, res) => {

});

app.post('/FilterDocument', validateUser,validateDataType('Object'), (req, res) => {

});

app.post('/UpdateDocument', validateUser,validateDataType('Object'),(req, res) => {

});
app.post('/DeleteDocument', validateUser, validateDataType('Object'), (req, res) => {

});



app.listen(3000, () => {
    console.log('Server running on port 3000');
});