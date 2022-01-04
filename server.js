const port = process.env.PORT || 3000;

const express = require('express');
const path    = require('path');
const app = express();

app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/app.html'));
});

app.listen(port, () => console.log('Ear training app is listening.'));