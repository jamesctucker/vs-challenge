const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 5001;

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, function () {
    console.log('Listening on port: ', port);
});