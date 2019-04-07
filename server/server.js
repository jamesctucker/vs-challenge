const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 5000;

json = { one: 1, two: 2 };



app.use(express.static('server/public'));

app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
});