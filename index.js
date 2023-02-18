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

app.post('/switchdatabse', validateUser,validateDataType('String'),(req, res) => {
    const id = req.body.id;
});

app.post('/insert',validateUser,validateDataType('Object'), (req, res) => {

});

app.post('/findall', validateUser,validateDataType('Object'), (req, res) => {

});

app.post('/filterdata', validateUser,validateDataType('Object'), (req, res) => {

});

app.post('/projectfields', validateUser,validateDataType('Object'),(req, res) => {

});
app.post('/aggregate', validateUser, validateDataType('Object'), (req, res) => {

});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});