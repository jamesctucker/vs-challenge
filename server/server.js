const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// these are required for csv reader/converter
const fs = require('fs');
//require the csvtojson converter class
const csvFilePath = 'data/data.csv'
const csv = require('csvtojson')


// this function converts csv file to json, and then writes the json to an existing
// empty json file
csv({
    noheader: false,
    headers: ['timestamp', 'sensor', 'people'],
    colParser: {
        'people': 'number',
    },
    checkType: true
})
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        console.log(jsonObj);
        fs.writeFile('data/data.json', JSON.stringify(jsonObj), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("the file was saved!");
        });
    })

// const jsonArray = await csv().fromFile(csvFilePath);


const port = process.env.PORT || 5001;

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, function () {
    console.log('Listening on port: ', port);
});